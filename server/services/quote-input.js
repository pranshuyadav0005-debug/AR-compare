const fs = require('fs');
const path = require('path');
const vm = require('vm');
const config = require('../functions/lib/config');
// The same checked-in catalogue powers both vehicle selection and validation.
const catalogue = vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../../public/js/car-data.js'), 'utf8') + '\nCAR_DATA;', {}, { timeout: 1000 });
const MAX_IDV = 100000000;
const ADDONS = new Set(['Zero Depreciation', 'Roadside Assistance', 'Engine Protect', 'Battery / Motor Protect', 'Return to Invoice', 'Consumables Cover', 'Key Protect', 'Tyre Protect', 'Loss of Personal Belongings']);
const ACCESSORIES = new Set(['trailer','nonElectrical','biofuel','electrical']);
const NCB = new Set([0,20,25,35,45,50]);
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
function invalid(message) { throw Object.assign(new Error(message), { status: 400 }); }
function object(value, label) { if (!value || typeof value !== 'object' || Array.isArray(value)) invalid(`${label} must be an object.`); return value; }
function text(value, label, max = 120) { if (typeof value !== 'string' || !value.trim() || value.length > max || /[\x00-\x1f]/.test(value)) invalid(`Enter a valid ${label}.`); return value.trim(); }
function numeric(value, label, min = 0, max = MAX_IDV, integer = false) {
  if ((typeof value !== 'number' && typeof value !== 'string') || String(value).trim() === '') invalid(`Enter a valid ${label}.`);
  const n = Number(value);
  if (!Number.isFinite(n) || n < min || n > max || (integer && !Number.isInteger(n))) invalid(`Enter a valid ${label}.`);
  return n;
}
function date(value, label) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) invalid(`Enter a valid ${label}.`);
  const parsed = new Date(`${value}T00:00:00Z`);
  if (!Number.isFinite(parsed.getTime()) || parsed.toISOString().slice(0,10) !== value) invalid(`Enter a valid ${label}.`);
  return value;
}
function strings(values, allowed, label) {
  if (!Array.isArray(values) || values.length > allowed.size || values.some(v => typeof v !== 'string' || !allowed.has(v))) invalid(`Select valid ${label}.`);
  return [...new Set(values)];
}
function validateQuoteInput(payload) {
  object(payload, 'Request');
  if (payload.declaredAccurate !== true) invalid('Confirm the vehicle and registration details are accurate before requesting quotes.');
  const input = object(payload.vehicle, 'Vehicle');
  const policyInput = object(payload.policy, 'Policy');
  const name = text(input.name || input.ownerName, 'owner name', 100);
  const regNumber = text(input.regNumber || input.registrationNumber, 'registration number', 15).replace(/\s/g, '').toUpperCase();
  const registrationType = input.registrationType === 'bh' ? 'bh' : 'normal';
  if (!(registrationType === 'bh' ? /^\d{2}BH\d{4}[A-Z]{1,2}$/ : /^[A-Z]{2}\d{1,2}[A-Z]{0,3}\d{1,4}$/).test(regNumber)) invalid('Enter a valid registration number.');
  const make = text(input.make || input.brand, 'manufacturer');
  const model = text(input.model, 'car model');
  const variant = text(input.variant, 'variant', 180);
  const fuelType = text(input.fuelType, 'fuel type');
  const car = catalogue[make]?.[model];
  const variantList = [...(car?.fuelTypes?.[fuelType] || []), ...Object.keys(car?.variantPrices?.[fuelType] || {})];
  if (!car || !variantList.includes(variant)) invalid('The selected manufacturer, model, fuel and variant do not match the vehicle catalogue.');
  const registeredDate = date(input.registeredDate, 'registration date');
  const policyExpiry = date(input.policyExpiry, 'policy expiry date');
  const today = new Date().toISOString().slice(0,10);
  if (registeredDate > today || Number(registeredDate.slice(0,4)) < 1900) invalid('Registration date must be a valid past or current date.');
  const ageInYears = (Date.now() - new Date(registeredDate).getTime()) / (365.25 * 86400000);
  const pricing = car.variantPrices?.[fuelType]?.[variant];
  const price = Number.isFinite(pricing?.exShowroomPrice) && pricing.exShowroomPrice > 0 ? pricing.exShowroomPrice : null;
  const depreciation = ageInYears <= .5 ? .05 : ageInYears <= 1 ? .15 : ageInYears <= 2 ? .2 : ageInYears <= 3 ? .3 : ageInYears <= 4 ? .4 : .5;
  const manualIDV = price === null ? numeric(input.manualIDV, 'manual IDV', 1, Math.floor(MAX_IDV/1.15), true) : null;
  const base = price === null ? manualIDV : Math.round(price * (1-depreciation));
  const fittedAccessories = {};
  if (input.fittedAccessories !== undefined) {
    object(input.fittedAccessories, 'Accessories');
    for (const [key,value] of Object.entries(input.fittedAccessories)) {
      if (!ACCESSORIES.has(key)) invalid('Select valid vehicle accessories.');
      fittedAccessories[key] = numeric(value, 'accessory IDV', 1, MAX_IDV, true);
    }
  }
  const autoIdv = base + Object.values(fittedAccessories).reduce((s,v)=>s+v,0);
  const idv = numeric(payload.idv, 'IDV', 1, MAX_IDV, true);
  if (idv < Math.round(autoIdv * .85) || idv > Math.round(autoIdv * 1.15)) invalid('IDV must be within ±15% of the vehicle base IDV including declared accessories.');
  const policyType = policyInput.policyType;
  if (!['comprehensive','standalone'].includes(policyType)) invalid('Select a valid policy type.');
  if (typeof policyInput.hadClaim !== 'boolean') invalid('Confirm the previous claim history.');
  const ncbPercent = numeric(policyInput.ncbPercent, 'NCB',0,50);
  if (!NCB.has(ncbPercent) || (policyInput.hadClaim && ncbPercent !== 0)) invalid('NCB must match the selected claim history.');
  const ncbLapsed = Math.floor((Date.parse(today) - Date.parse(policyExpiry))/86400000) >= 90;
  if (ncbLapsed && ncbPercent !== 0) invalid('NCB must be zero for the expired-policy condition shown in Policy Details.');
  const prevPolicyCover = strings(policyInput.prevPolicyCover, new Set(['zero_dep','rti','engine_protection','none']), 'previous policy covers');
  if (!prevPolicyCover.length || (prevPolicyCover.includes('none') && prevPolicyCover.length > 1)) invalid('Confirm the previous policy covers.');
  const selectedAddons = strings(policyInput.selectedAddons || [], ADDONS, 'add-ons');
  const advisorDiscount = numeric(policyInput.advisorDiscount ?? 0, 'advisor discount',0,config.maxAdvisorDiscount);
  const tpExpiryDate = policyType === 'standalone' ? date(policyInput.tpExpiryDate,'third-party expiry date') : null;
  let customerType;
  if (input.customerType !== undefined) {
    if (!['new_customer','renewal','rollover'].includes(input.customerType)) invalid('Select a valid customer category.');
    customerType = input.customerType;
  }
  const policy = { policyType, hadClaim:policyInput.hadClaim, ncbPercent, ncbLapsed, prevPolicyCover, selectedAddons, advisorDiscount, tpExpiryDate };
  const vehicle = { name,regNumber,registrationType,make,brand:make,model,variant,fuelType,bodyType:car.bodyType || '',registeredDate,policyExpiry,year:Number(registeredDate.slice(0,4)),ageInYears,manufacturerPrice:price,exShowroomPrice:price,manualIDV,idvSource:price === null ? 'manual' : 'calculated',engineCC:pricing?.engineCC ?? null,motorPowerKW:pricing?.motorPowerKW ?? null,fittedAccessories,...policy };
  if (customerType) vehicle.customerType=customerType;
  // Treat browser verification labels as advisory; never promote them to trusted verification.
  vehicle.verificationStatus = 'advisor_declared';
  const quotationId = payload.quotationId == null ? null : String(payload.quotationId);
  if (quotationId && !UUID.test(quotationId)) invalid('Invalid quotation reference.');
  const expectedRevision=payload.expectedRevision==null?null:payload.expectedRevision;
  if(expectedRevision!==null&&(!Number.isSafeInteger(expectedRevision)||expectedRevision<1||expectedRevision>2147483646))invalid('Invalid quotation revision.');
  return { vehicle,policy,idv,autoIdv,advisorDiscount,quotationId,expectedRevision,declaredAccurate:true };
}
module.exports = { validateQuoteInput, catalogue, MAX_IDV };
