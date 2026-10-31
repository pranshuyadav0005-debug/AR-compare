// CAR_DATA — all current vehicle variants retained.
// Ex-showroom prices are enriched only from existing project price aliases or the provided Variant Database.
const CAR_DATA = {
  "Aston Martin": {
    "DB12": {
      "bodyType": "Coupe/Convertible",
      "fuelTypes": {
        "Petrol": [
          "S Volante",
          "S"
        ]
      },
      "basePrice": 41000000,
      "variantPrices": {
        "Petrol": {
          "S Volante": {
            "exShowroomPrice": 4,
            "engineCC": 3982
          },
          "S": {
            "exShowroomPrice": 4,
            "engineCC": 3982
          }
        }
      }
    },
    "DBX": {
      "bodyType": "Car",
      "fuelTypes": {
        "Petrol": [
          "S"
        ]
      },
      "basePrice": 41500000,
      "variantPrices": {
        "Petrol": {
          "S": {
            "exShowroomPrice": 4,
            "engineCC": 3982
          }
        }
      }
    },
    "Vantage": {
      "bodyType": "Car",
      "fuelTypes": {
        "Petrol": [
          "S Roadster",
          "S"
        ]
      },
      "basePrice": 31500000,
      "variantPrices": {
        "Petrol": {
          "S Roadster": {
            "exShowroomPrice": 3,
            "engineCC": 3998
          },
          "S": {
            "exShowroomPrice": 3,
            "engineCC": 3998
          }
        }
      }
    }
  },
  "Audi": {
    "A4": {
      "bodyType": "Sedan",
      "fuelTypes": {
        "Petrol": [
          "1.8 TFSI",
          "1.8T",
          "2.0 TFSI",
          "3.2 FSI",
          "40 TFSI Premium",
          "40 TFSI Premium Plus",
          "40 TFSI Technology",
          "Premium",
          "Premium Plus",
          "Technology"
        ],
        "Diesel": [
          "2.0 TDI",
          "35 TDI Premium",
          "35 TDI Premium Plus",
          "35 TDI Technology"
        ]
      },
      "basePrice": 4688000,
      "variantPrices": {
        "Petrol": {
          "Premium": {
            "exShowroomPrice": 4688000,
            "engineCC": 1984
          },
          "Premium Plus": {
            "exShowroomPrice": 5185000,
            "engineCC": 1984
          },
          "Technology": {
            "exShowroomPrice": 5583000,
            "engineCC": 1984
          }
        },
        "Diesel": {}
      }
    },
    "A6": {
      "bodyType": "Sedan",
      "fuelTypes": {
        "Petrol": [
          "2.0 TFSI",
          "2.4",
          "2.8 FSI",
          "3.0 TFSI",
          "3.2 FSI",
          "45 TFSI Premium Plus",
          "45 TFSI Technology",
          "Premium"
        ],
        "Diesel": [
          "2.0 TDI",
          "2.7 TDI / 3.0 TDI",
          "3.0 TDI",
          "35 TDI",
          "45 TDI"
        ]
      },
      "basePrice": 6374000,
      "variantPrices": {
        "Petrol": {
          "45 TFSI Premium Plus": {
            "exShowroomPrice": 6374000,
            "engineCC": 1984
          },
          "45 TFSI Technology": {
            "exShowroomPrice": 6989000,
            "engineCC": 1984
          }
        },
        "Diesel": {}
      }
    },
    "Q3": {
      "bodyType": "SUV",
      "fuelTypes": {
        "Petrol": [
          "30 TFSI",
          "35 TDI quattro",
          "Premium",
          "Premium Plus",
          "Technology"
        ],
        "Diesel": [
          "30 TDI",
          "30 TFSI",
          "35 TDI",
          "35 TDI quattro"
        ]
      },
      "basePrice": 4367000,
      "variantPrices": {
        "Petrol": {
          "Premium": {
            "exShowroomPrice": 4367000,
            "engineCC": 1984
          },
          "Premium Plus": {
            "exShowroomPrice": 4819000,
            "engineCC": 1984
          },
          "Technology": {
            "exShowroomPrice": 5231000,
            "engineCC": 1984
          }
        },
        "Diesel": {}
      }
    },
    "Q3 Sportback": {
      "bodyType": "Compact SUV Coupe",
      "fuelTypes": {
        "Petrol": [
          "40TFSI Quattro",
          "Premium Plus",
          "Technology"
        ]
      },
      "basePrice": 5425000,
      "variantPrices": {
        "Petrol": {
          "40TFSI Quattro": {
            "exShowroomPrice": 5425000,
            "engineCC": 1984
          }
        }
      }
    },
    "Q5": {
      "bodyType": "SUV",
      "fuelTypes": {
        "Petrol": [
          "2.0 TFSI quattro",
          "Premium Plus",
          "Technology"
        ],
        "Diesel": [
          "2.0 TDI quattro",
          "3.0 TDI quattro"
        ]
      },
      "basePrice": 6375000,
      "variantPrices": {
        "Petrol": {
          "Premium Plus": {
            "exShowroomPrice": 6375000,
            "engineCC": 1984
          },
          "Technology": {
            "exShowroomPrice": 6986000,
            "engineCC": 1984
          }
        },
        "Diesel": {}
      }
    },
    "Q7": {
      "bodyType": "SUV",
      "fuelTypes": {
        "Petrol": [
          "3.6 FSI quattro",
          "4.2 FSI quattro",
          "Premium Plus",
          "Technology"
        ],
        "Diesel": [
          "3.0 TDI quattro",
          "4.2 TDI quattro",
          "45 TDI quattro",
          "50 TDI quattro",
          "Technology Pack"
        ]
      },
      "basePrice": 8717000,
      "variantPrices": {
        "Petrol": {
          "Premium Plus": {
            "exShowroomPrice": 8717000,
            "engineCC": 2995
          },
          "Technology": {
            "exShowroomPrice": 9615000,
            "engineCC": 2995
          }
        },
        "Diesel": {}
      }
    },
    "Q8": {
      "bodyType": "SUV",
      "fuelTypes": {
        "Petrol": [
          "Celebration Edition",
          "Premium Plus",
          "Quattro",
          "Technology"
        ]
      },
      "basePrice": 11300000,
      "variantPrices": {
        "Petrol": {
          "Quattro": {
            "exShowroomPrice": 1,
            "engineCC": 2995
          }
        }
      }
    },
    "RS Q8": {
      "bodyType": "Performance SUV",
      "fuelTypes": {
        "Petrol": [
          "Performance",
          "Standard"
        ]
      },
      "basePrice": 23400000,
      "variantPrices": {
        "Petrol": {
          "Performance": {
            "exShowroomPrice": 2,
            "engineCC": 3998
          }
        }
      }
    },
    "SQ8": {
      "bodyType": "SUV",
      "fuelTypes": {
        "Petrol": [
          "V8 TFSI"
        ]
      },
      "basePrice": 17800000,
      "variantPrices": {
        "Petrol": {
          "V8 TFSI": {
            "exShowroomPrice": 2,
            "engineCC": 3996
          }
        }
      }
    }
  },
  "BMW": {
    "2 Series Gran Coupe": {
      "bodyType": "Sedan",
      "fuelTypes": {
        "Petrol": [
          "218 M Sport",
          "218 M Sport Pro",
          "220i M Sport",
          "220i Sport Line",
          "M235i xDrive"
        ]
      },
      "basePrice": 4580000,
      "variantPrices": {
        "Petrol": {
          "218 M Sport": {
            "exShowroomPrice": 4580000,
            "engineCC": 1499
          },
          "218 M Sport Pro": {
            "exShowroomPrice": 4820000,
            "engineCC": 1499
          }
        }
      }
    },
    "3 Series": {
      "bodyType": "Sedan",
      "fuelTypes": {
        "Petrol": [
          "320d Luxury Line",
          "320d M Sport",
          "320d Sport Line",
          "320i",
          "320Ld Luxury Line",
          "320Ld M Sport",
          "325i",
          "328i / 330i",
          "330i",
          "330i GT (Gran Turismo)",
          "330i M Sport",
          "330Li M Sport",
          "M3",
          "M340i xDrive"
        ],
        "Diesel": [
          "320d",
          "320d Luxury Line",
          "320d M Sport",
          "320d Sport Line",
          "320Ld Luxury Line",
          "320Ld M Sport",
          "325d",
          "330d",
          "330i M Sport",
          "330Li M Sport"
        ]
      },
      "basePrice": 7710000,
      "variantPrices": {
        "Petrol": {
          "M340i xDrive": {
            "exShowroomPrice": 7710000,
            "engineCC": 2998
          }
        },
        "Diesel": {}
      }
    },
    "3 Series Long Wheelbase": {
      "bodyType": "Sedan",
      "fuelTypes": {
        "Petrol": [
          "330Li M Sport 50 Jahre Edition",
          "330Li M Sport"
        ],
        "Diesel": [
          "320Ld M Sport Pro",
          "320Ld M Sport"
        ]
      },
      "basePrice": 6060000,
      "variantPrices": {
        "Petrol": {
          "330Li M Sport 50 Jahre Edition": {
            "exShowroomPrice": 6060000,
            "engineCC": 1998
          },
          "330Li M Sport": {
            "exShowroomPrice": 6270000,
            "engineCC": 1998
          }
        },
        "Diesel": {
          "320Ld M Sport Pro": {
            "exShowroomPrice": 6150000,
            "engineCC": 1998
          },
          "320Ld M Sport": {
            "exShowroomPrice": 6420000,
            "engineCC": 1998
          }
        }
      }
    },
    "5 Series": {
      "bodyType": "Sedan",
      "fuelTypes": {
        "Petrol": [
          "30i Gran Limousine",
          "220d",
          "220d M Sport",
          "330Li",
          "330Li M Sport",
          "520d Luxury Line",
          "520d M Sport",
          "525i",
          "528i / 530i",
          "530i",
          "530i M Sport",
          "530Li",
          "540i",
          "M5",
          "M5 Competition"
        ],
        "Diesel": [
          "30i Gran Limousine",
          "220d",
          "220d M Sport",
          "330Li",
          "330Li M Sport",
          "520d",
          "520d Luxury Line",
          "520d M Sport",
          "525d",
          "530d",
          "530d M Sport",
          "530d Sport Line",
          "530i M Sport"
        ]
      },
      "basePrice": 7660000,
      "variantPrices": {
        "Petrol": {
          "530Li": {
            "exShowroomPrice": 7660000,
            "engineCC": 1998
          }
        },
        "Diesel": {}
      }
    },
    "7 Series": {
      "bodyType": "Sedan",
      "fuelTypes": {
        "Petrol": [
          "730i",
          "730Ld",
          "730Ld DPE Signature",
          "730Li",
          "740i",
          "740i M Sport",
          "740Li",
          "740Li DPE Signature",
          "740Li M Sport",
          "750Li",
          "760Li"
        ],
        "Diesel": [
          "730d",
          "730Ld",
          "730Ld DPE Signature",
          "730Ld M Sport",
          "740d M Sport",
          "740Li",
          "740Li M Sport"
        ]
      },
      "basePrice": 18300000,
      "variantPrices": {
        "Petrol": {
          "740i M Sport": {
            "exShowroomPrice": 2,
            "engineCC": 2998
          }
        },
        "Diesel": {
          "740d M Sport": {
            "exShowroomPrice": 2,
            "engineCC": 2993
          }
        }
      }
    },
    "M2": {
      "bodyType": "Coupe/Convertible",
      "fuelTypes": {
        "Petrol": [
          "Coupe",
          "Coupe Manual",
          "CS"
        ]
      },
      "basePrice": 10600000,
      "variantPrices": {
        "Petrol": {
          "Coupe": {
            "exShowroomPrice": 1,
            "engineCC": 2993
          },
          "Coupe Manual": {
            "exShowroomPrice": 1,
            "engineCC": 2993
          },
          "CS": {
            "exShowroomPrice": 2,
            "engineCC": 2993
          }
        }
      }
    },
    "M4 CS": {
      "bodyType": "Coupe/Convertible",
      "fuelTypes": {
        "Petrol": [
          "xDrive"
        ]
      },
      "basePrice": 17900000,
      "variantPrices": {
        "Petrol": {
          "xDrive": {
            "exShowroomPrice": 2,
            "engineCC": 2993
          }
        }
      }
    },
    "M4 Competition": {
      "bodyType": "Coupe/Convertible",
      "fuelTypes": {
        "Petrol": [
          "xDrive"
        ]
      },
      "basePrice": 16000000,
      "variantPrices": {
        "Petrol": {
          "xDrive": {
            "exShowroomPrice": 2,
            "engineCC": 2993
          }
        }
      }
    },
    "M440i": {
      "bodyType": "Coupe/Convertible",
      "fuelTypes": {
        "Petrol": [
          "xDrive Convertible"
        ]
      },
      "basePrice": 10900000,
      "variantPrices": {
        "Petrol": {
          "xDrive Convertible": {
            "exShowroomPrice": 1,
            "engineCC": 2998
          }
        }
      }
    },
    "M5": {
      "bodyType": "Sedan (performance)",
      "fuelTypes": {
        "Petrol": [
          "M5",
          "xDrive"
        ]
      },
      "basePrice": 21200000,
      "variantPrices": {
        "Petrol": {
          "xDrive": {
            "exShowroomPrice": 2,
            "engineCC": 4395
          }
        }
      }
    },
    "M8 Coupe Competition": {
      "bodyType": "Coupe/Convertible",
      "fuelTypes": {
        "Petrol": [
          "50 Jahre M Edition"
        ]
      },
      "basePrice": 23800000,
      "variantPrices": {
        "Petrol": {
          "50 Jahre M Edition": {
            "exShowroomPrice": 2,
            "engineCC": 4395
          }
        }
      }
    },
    "X1": {
      "bodyType": "SUV",
      "fuelTypes": {
        "Petrol": [
          "sDrive18d",
          "sDrive18d M Sport",
          "sDrive18i M Sport",
          "sDrive20d",
          "sDrive20d xLine",
          "sDrive20i",
          "sDrive20i M Sport"
        ],
        "Diesel": [
          "sDrive18d",
          "sDrive18d M Sport",
          "sDrive20d",
          "sDrive20d xLine",
          "sDrive20i",
          "sDrive20i M Sport",
          "xDrive20d"
        ]
      },
      "basePrice": 5090000,
      "variantPrices": {
        "Petrol": {
          "sDrive18i M Sport": {
            "exShowroomPrice": 5090000,
            "engineCC": 1499
          }
        },
        "Diesel": {}
      }
    },
    "X1 LWB": {
      "bodyType": "SUV",
      "fuelTypes": {
        "Petrol": [
          "sDrive18Li M Sport"
        ]
      },
      "basePrice": 4990000,
      "variantPrices": {
        "Petrol": {
          "sDrive18Li M Sport": {
            "exShowroomPrice": 4990000,
            "engineCC": 1499
          }
        }
      }
    },
    "X3": {
      "bodyType": "SUV",
      "fuelTypes": {
        "Diesel": [
          "2.0d / 3.0d",
          "xDrive 20d M Sport",
          "xDrive20d",
          "xDrive20d Luxury Line",
          "xDrive20d M Sport",
          "xDrive20d xLine",
          "xDrive30 Hybrid M Sport",
          "xDrive30d",
          "xDrive30d M Sport",
          "xDrive30i M Sport"
        ],
        "Petrol": [
          "2.5i",
          "3.0i",
          "xDrive 20 M Sport",
          "xDrive 30 M Sport Pro",
          "xDrive20d Luxury Line",
          "xDrive20d M Sport",
          "xDrive20d xLine",
          "xDrive30i M Sport"
        ],
        "Petrol Hybrid": [
          "xDrive20d M Sport",
          "xDrive30 Hybrid M Sport"
        ]
      },
      "basePrice": 6990000,
      "variantPrices": {
        "Diesel": {
          "xDrive 20d M Sport": {
            "exShowroomPrice": 7550000,
            "engineCC": 1995
          }
        },
        "Petrol": {
          "xDrive 20 M Sport": {
            "exShowroomPrice": 6990000,
            "engineCC": 1998
          },
          "xDrive 30 M Sport Pro": {
            "exShowroomPrice": 7600000,
            "engineCC": 1998
          }
        },
        "Petrol Hybrid": {}
      }
    },
    "X5": {
      "bodyType": "SUV",
      "fuelTypes": {
        "Diesel": [
          "3.0d / 30d",
          "xDrive30d",
          "xDrive30d M Sport",
          "xDrive30d xLine",
          "xDrive40i M Sport"
        ],
        "Petrol": [
          "3.0si",
          "4.8i",
          "M60i / X5 M",
          "xDrive30d M Sport",
          "xDrive40i M Sport",
          "xDrive40i xLine"
        ]
      },
      "basePrice": 9690000,
      "variantPrices": {
        "Diesel": {
          "xDrive30d xLine": {
            "exShowroomPrice": 9890000,
            "engineCC": 2993
          },
          "xDrive30d M Sport": {
            "exShowroomPrice": 1,
            "engineCC": 2993
          }
        },
        "Petrol": {
          "xDrive40i xLine": {
            "exShowroomPrice": 9690000,
            "engineCC": 2998
          },
          "xDrive40i M Sport": {
            "exShowroomPrice": 1,
            "engineCC": 2998
          }
        }
      }
    },
    "X6": {
      "bodyType": "SUV Coupe",
      "fuelTypes": {
        "Petrol": [
          "M60i xDrive",
          "xDrive40i / M60i",
          "xDrive50i",
          "xDrive50i / M50d"
        ],
        "Diesel": [
          "xDrive30d"
        ]
      },
      "basePrice": 17800000,
      "variantPrices": {
        "Petrol": {
          "M60i xDrive": {
            "exShowroomPrice": 2,
            "engineCC": 4395
          }
        },
        "Diesel": {}
      }
    },
    "X7": {
      "bodyType": "SUV",
      "fuelTypes": {
        "Diesel": [
          "M60i",
          "xDrive30d DPE Signature",
          "xDrive40d Design Pure Excellence",
          "xDrive40d M Sport",
          "xDrive40i M Sport"
        ],
        "Petrol": [
          "M60i",
          "xDrive30d DPE Signature",
          "xDrive40d M Sport",
          "xDrive40i M Sport",
          "xDrive40i M Sport Signature"
        ]
      },
      "basePrice": 12600000,
      "variantPrices": {
        "Diesel": {
          "xDrive40d M Sport": {
            "exShowroomPrice": 1,
            "engineCC": 2993
          },
          "xDrive40d Design Pure Excellence": {
            "exShowroomPrice": 1,
            "engineCC": 2993
          }
        },
        "Petrol": {
          "xDrive40i M Sport Signature": {
            "exShowroomPrice": 1,
            "engineCC": 2998
          },
          "xDrive40i M Sport": {
            "exShowroomPrice": 1,
            "engineCC": 2998
          }
        }
      }
    },
    "XM": {
      "bodyType": "Performance SUV (Hybrid)",
      "fuelTypes": {
        "Petrol": [
          "xDrive"
        ],
        "Petrol Hybrid": [
          "Label Red",
          "Standard"
        ]
      },
      "basePrice": 25500000,
      "variantPrices": {
        "Petrol": {
          "xDrive": {
            "exShowroomPrice": 3,
            "engineCC": 4395
          }
        },
        "Petrol Hybrid": {}
      }
    },
    "Z4": {
      "bodyType": "Coupe/Convertible",
      "fuelTypes": {
        "Petrol": [
          "2.5i",
          "3.0i",
          "M40i",
          "M40i Pure Impulse",
          "M40i Pure Impulse AT",
          "sDrive35i"
        ]
      },
      "basePrice": 9050000,
      "variantPrices": {
        "Petrol": {
          "M40i Pure Impulse AT": {
            "exShowroomPrice": 9170000,
            "engineCC": 2998
          },
          "M40i Pure Impulse": {
            "exShowroomPrice": 9520000,
            "engineCC": 2998
          },
          "M40i": {
            "exShowroomPrice": 9050000,
            "engineCC": 2998
          }
        }
      }
    },
    "i4": {
      "bodyType": "Electric Sedan (Gran Coupe)",
      "fuelTypes": {
        "Electric": [
          "eDrive35 M Sport",
          "eDrive40",
          "eDrive40 M Sport",
          "M50"
        ]
      },
      "basePrice": 7250000,
      "variantPrices": {
        "Electric": {
          "eDrive35 M Sport": {
            "exShowroomPrice": 7250000
          },
          "eDrive40 M Sport": {
            "exShowroomPrice": 7750000
          }
        }
      }
    },
    "i5": {
      "bodyType": "Electric",
      "fuelTypes": {
        "Electric": [
          "M60 xDrive"
        ]
      },
      "basePrice": 12000000,
      "variantPrices": {
        "Electric": {
          "M60 xDrive": {
            "exShowroomPrice": 1
          }
        }
      }
    },
    "i7": {
      "bodyType": "Electric",
      "fuelTypes": {
        "Electric": [
          "eDrive50 M Sport",
          "M70 xDrive"
        ]
      },
      "basePrice": 21000000,
      "variantPrices": {
        "Electric": {
          "eDrive50 M Sport": {
            "exShowroomPrice": 2
          },
          "M70 xDrive": {
            "exShowroomPrice": 3
          }
        }
      }
    },
    "iX": {
      "bodyType": "Electric SUV",
      "fuelTypes": {
        "Electric": [
          "xDrive40",
          "xDrive50"
        ]
      },
      "basePrice": 14000000,
      "variantPrices": {
        "Electric": {
          "xDrive50": {
            "exShowroomPrice": 1
          }
        }
      }
    },
    "iX1": {
      "bodyType": "SUV",
      "fuelTypes": {
        "Electric": [
          "LWB"
        ]
      },
      "basePrice": 5240000,
      "variantPrices": {
        "Electric": {
          "LWB": {
            "exShowroomPrice": 5240000
          }
        }
      }
    }
  },
  "BYD": {
    "Atto 3": {
      "bodyType": "Coupe/Convertible",
      "fuelTypes": {
        "Electric": [
          "Superior",
          "Dynamic",
          "Premium"
        ]
      },
      "basePrice": 2499000,
      "variantPrices": {
        "Electric": {
          "Superior": {
            "exShowroomPrice": 3449000
          },
          "Dynamic": {
            "exShowroomPrice": 2499000
          },
          "Premium": {
            "exShowroomPrice": 3035000
          }
        }
      }
    },
    "Seal": {
      "bodyType": "Electric",
      "fuelTypes": {
        "Electric": [
          "Dynamic Range",
          "Premium Range",
          "Performance"
        ]
      },
      "basePrice": 4150000,
      "variantPrices": {
        "Electric": {
          "Dynamic Range": {
            "exShowroomPrice": 4150000
          },
          "Premium Range": {
            "exShowroomPrice": 4620000
          },
          "Performance": {
            "exShowroomPrice": 5365000
          }
        }
      }
    },
    "Sealion 7": {
      "bodyType": "Electric",
      "fuelTypes": {
        "Electric": [
          "Premium Anniversary Edition",
          "Performance Anniversary Edition",
          "Dynamic",
          "Performance",
          "Premium"
        ]
      },
      "basePrice": 4190000,
      "variantPrices": {
        "Electric": {
          "Premium Anniversary Edition": {
            "exShowroomPrice": 4990000
          },
          "Performance Anniversary Edition": {
            "exShowroomPrice": 5590000
          },
          "Dynamic": {
            "exShowroomPrice": 4190000
          },
          "Performance": {
            "exShowroomPrice": 5590000
          },
          "Premium": {
            "exShowroomPrice": 4990000
          }
        }
      }
    },
    "eMAX 7": {
      "bodyType": "Car",
      "fuelTypes": {
        "Electric": [
          "Superior 6-Seater",
          "Comfort 6-Seater",
          "Premium 6-Seater",
          "Premium 7-Seater",
          "Comfort 7-Seater",
          "Superior 7-Seater"
        ]
      },
      "basePrice": 2690000,
      "variantPrices": {
        "Electric": {
          "Superior 6-Seater": {
            "exShowroomPrice": 2930000
          },
          "Comfort 6-Seater": {
            "exShowroomPrice": 2790000
          },
          "Premium 6-Seater": {
            "exShowroomPrice": 2690000
          },
          "Premium 7-Seater": {
            "exShowroomPrice": 2750000
          },
          "Comfort 7-Seater": {
            "exShowroomPrice": 2830000
          },
          "Superior 7-Seater": {
            "exShowroomPrice": 2990000
          }
        }
      }
    }
  },
  "Bajaj": {
    "Qute": {
      "bodyType": "Car",
      "fuelTypes": {
        "CNG": [
          "Qute"
        ]
      },
      "basePrice": 360609,
      "variantPrices": {
        "CNG": {
          "Qute": {
            "exShowroomPrice": 361000,
            "engineCC": 216
          }
        }
      }
    }
  },
  "Blinq": {
    "RYDE": {
      "bodyType": "Car",
      "fuelTypes": {
        "Electric": [
          "Fleets",
          "Family"
        ]
      },
      "basePrice": 450000,
      "variantPrices": {
        "Electric": {
          "Fleets": {
            "exShowroomPrice": 500000
          },
          "Family": {
            "exShowroomPrice": 450000
          }
        }
      }
    }
  },
  "Carmodels": {
    "Force Gurkha": {
      "bodyType": "Car",
      "fuelTypes": {
        "Diesel": [
          "2.6"
        ]
      },
      "basePrice": 1631000,
      "variantPrices": {
        "Diesel": {
          "2.6": {
            "exShowroomPrice": 1631000,
            "engineCC": 2596
          }
        }
      }
    }
  },
  "Citroen": {
    "Aircross X": {
      "bodyType": "Car",
      "fuelTypes": {
        "Petrol": [
          "Turbo Max AT 7 Seater DT",
          "Turbo Plus 7 Seater Comfort Edition",
          "You Comfort Edition",
          "Turbo Plus 7 Seater",
          "You",
          "Plus",
          "Plus Comfort Edition",
          "Turbo Max 7 Seater",
          "Aircross Turbo Max AT",
          "Turbo Max AT 7 Seater",
          "Aircross Turbo Max",
          "Turbo Max 7 Seater DT"
        ]
      },
      "basePrice": 889000,
      "variantPrices": {
        "Petrol": {
          "Turbo Max AT 7 Seater DT": {
            "exShowroomPrice": 1472000,
            "engineCC": 1199
          },
          "Turbo Plus 7 Seater Comfort Edition": {
            "exShowroomPrice": 1199000,
            "engineCC": 1199
          },
          "You Comfort Edition": {
            "exShowroomPrice": 909000,
            "engineCC": 1199
          },
          "Turbo Plus 7 Seater": {
            "exShowroomPrice": 1199000,
            "engineCC": 1199
          },
          "You": {
            "exShowroomPrice": 889000,
            "engineCC": 1199
          },
          "Plus": {
            "exShowroomPrice": 999000,
            "engineCC": 1199
          },
          "Plus Comfort Edition": {
            "exShowroomPrice": 999000,
            "engineCC": 1199
          },
          "Turbo Max 7 Seater": {
            "exShowroomPrice": 1335000,
            "engineCC": 1199
          },
          "Aircross Turbo Max AT": {
            "exShowroomPrice": 1414000,
            "engineCC": 1199
          },
          "Turbo Max AT 7 Seater": {
            "exShowroomPrice": 1452000,
            "engineCC": 1199
          },
          "Aircross Turbo Max": {
            "exShowroomPrice": 1414000,
            "engineCC": 1199
          },
          "Turbo Max 7 Seater DT": {
            "exShowroomPrice": 1355000,
            "engineCC": 1199
          }
        }
      }
    },
    "Basalt X": {
      "bodyType": "Car",
      "fuelTypes": {
        "Petrol": [
          "You",
          "Plus Turbo AT",
          "Max Turbo DT",
          "Max Turbo AT DT",
          "You Comfort Edition",
          "Plus Turbo",
          "Max Turbo AT",
          "Max Turbo",
          "Plus Comfort Edition",
          "Plus Turbo AT Comfort Edition",
          "Plus Turbo Comfort Edition",
          "Plus"
        ]
      },
      "basePrice": 855000,
      "variantPrices": {
        "Petrol": {
          "You": {
            "exShowroomPrice": 855000,
            "engineCC": 1199
          },
          "Plus Turbo AT": {
            "exShowroomPrice": 1267000,
            "engineCC": 1199
          },
          "Max Turbo DT": {
            "exShowroomPrice": 1284000,
            "engineCC": 1199
          },
          "Max Turbo AT DT": {
            "exShowroomPrice": 1411000,
            "engineCC": 1199
          },
          "You Comfort Edition": {
            "exShowroomPrice": 875000,
            "engineCC": 1199
          },
          "Plus Turbo": {
            "exShowroomPrice": 1142000,
            "engineCC": 1199
          },
          "Max Turbo AT": {
            "exShowroomPrice": 1389000,
            "engineCC": 1199
          },
          "Max Turbo": {
            "exShowroomPrice": 1262000,
            "engineCC": 1199
          },
          "Plus Comfort Edition": {
            "exShowroomPrice": 999000,
            "engineCC": 1199
          },
          "Plus Turbo AT Comfort Edition": {
            "exShowroomPrice": 1282000,
            "engineCC": 1199
          },
          "Plus Turbo Comfort Edition": {
            "exShowroomPrice": 1157000,
            "engineCC": 1199
          },
          "Plus": {
            "exShowroomPrice": 999000,
            "engineCC": 1199
          }
        }
      }
    },
    "C3 X": {
      "bodyType": "Car",
      "fuelTypes": {
        "CNG": [
          "Feel Optional",
          "Shine Dual Tone",
          "Shine Dark Edition",
          "Feel",
          "Shine",
          "Live"
        ],
        "Petrol": [
          "Shine Turbo AT",
          "Shine Turbo",
          "Feel Optional",
          "Shine",
          "Turbo Shine Dark Edition",
          "Turbo Shine Sport Edition AT",
          "Feel",
          "Shine Dual Tone",
          "Live Optional",
          "Turbo Shine Dark Edition AT",
          "Shine Dark Edition",
          "Turbo Feel",
          "Live",
          "Turbo Shine DT AT"
        ]
      },
      "basePrice": 499000,
      "variantPrices": {
        "CNG": {
          "Feel Optional": {
            "exShowroomPrice": 758000,
            "engineCC": 1198
          },
          "Shine Dual Tone": {
            "exShowroomPrice": 831000,
            "engineCC": 1198
          },
          "Shine Dark Edition": {
            "exShowroomPrice": 931000,
            "engineCC": 1198
          },
          "Feel": {
            "exShowroomPrice": 845000,
            "engineCC": 1198
          },
          "Shine": {
            "exShowroomPrice": 816000,
            "engineCC": 1198
          },
          "Live": {
            "exShowroomPrice": 573000,
            "engineCC": 1198
          }
        },
        "Petrol": {
          "Shine Turbo AT": {
            "exShowroomPrice": 960000,
            "engineCC": 1199
          },
          "Shine Turbo": {
            "exShowroomPrice": 889000,
            "engineCC": 1199
          },
          "Feel Optional": {
            "exShowroomPrice": 695000,
            "engineCC": 1198
          },
          "Shine": {
            "exShowroomPrice": 778000,
            "engineCC": 1198
          },
          "Turbo Shine Dark Edition": {
            "exShowroomPrice": 958000,
            "engineCC": 1199
          },
          "Turbo Shine Sport Edition AT": {
            "exShowroomPrice": 1021000,
            "engineCC": 1199
          },
          "Feel": {
            "exShowroomPrice": 600000,
            "engineCC": 1198
          },
          "Shine Dual Tone": {
            "exShowroomPrice": 793000,
            "engineCC": 1198
          },
          "Live Optional": {
            "exShowroomPrice": 563000,
            "engineCC": 1198
          },
          "Turbo Shine Dark Edition AT": {
            "exShowroomPrice": 1019000,
            "engineCC": 1199
          },
          "Shine Dark Edition": {
            "exShowroomPrice": 838000,
            "engineCC": 1198
          },
          "Turbo Feel": {
            "exShowroomPrice": 750000,
            "engineCC": 1199
          },
          "Live": {
            "exShowroomPrice": 499000,
            "engineCC": 1198
          },
          "Turbo Shine DT AT": {
            "exShowroomPrice": 1015000,
            "engineCC": 1199
          }
        }
      }
    },
    "C5 Aircross": {
      "bodyType": "Car",
      "fuelTypes": {
        "Diesel": [
          "Shine",
          "Shine Dual Tone"
        ]
      },
      "basePrice": 3732000,
      "variantPrices": {
        "Diesel": {
          "Shine": {
            "exShowroomPrice": 3732000,
            "engineCC": 1997
          },
          "Shine Dual Tone": {
            "exShowroomPrice": 3732000,
            "engineCC": 1997
          }
        }
      }
    },
    "e-C3 X": {
      "bodyType": "Car",
      "fuelTypes": {
        "Electric": [
          "Live",
          "Shine",
          "Live (O)"
        ]
      },
      "basePrice": 1199000,
      "variantPrices": {
        "Electric": {
          "Live": {
            "exShowroomPrice": 1199000
          },
          "Shine": {
            "exShowroomPrice": 1326000
          },
          "Live (O)": {
            "exShowroomPrice": 1235000
          }
        }
      }
    }
  },
  "Ferrari": {
    "F8 Tributo": {
      "bodyType": "Car",
      "fuelTypes": {
        "Petrol": [
          "V8 Turbo"
        ]
      },
      "basePrice": 40200000,
      "variantPrices": {
        "Petrol": {
          "V8 Turbo": {
            "exShowroomPrice": 4,
            "engineCC": 3902
          }
        }
      }
    },
    "Roma": {
      "bodyType": "Coupe/Convertible",
      "fuelTypes": {
        "Petrol": [
          "Coupe V8"
        ]
      },
      "basePrice": 37600000,
      "variantPrices": {
        "Petrol": {
          "Coupe V8": {
            "exShowroomPrice": 4,
            "engineCC": 3855
          }
        }
      }
    }
  },
  "Force": {
    "Force Gurkha 5 Door": {
      "bodyType": "Car",
      "fuelTypes": {
        "Diesel": [
          "Force Gurkha 5 Door"
        ]
      },
      "basePrice": 1763000,
      "variantPrices": {
        "Diesel": {
          "Force Gurkha 5 Door": {
            "exShowroomPrice": 1763000,
            "engineCC": 2596
          }
        }
      }
    },
    "Force Urbania": {
      "bodyType": "Car",
      "fuelTypes": {
        "Diesel": [
          "3350WB 10Str",
          "3615WB 14Str",
          "3615WB 10Str",
          "3615WB 13Str",
          "4400WB 17Str",
          "4400WB 13Str",
          "4400WB 14Str",
          "3350WB 11Str"
        ]
      },
      "basePrice": 2634000,
      "variantPrices": {
        "Diesel": {
          "3350WB 10Str": {
            "exShowroomPrice": 2897000,
            "engineCC": 2596
          },
          "3615WB 14Str": {
            "exShowroomPrice": 2889000,
            "engineCC": 2596
          },
          "3615WB 10Str": {
            "exShowroomPrice": 2901000,
            "engineCC": 2596
          },
          "3615WB 13Str": {
            "exShowroomPrice": 3157000,
            "engineCC": 2596
          },
          "4400WB 17Str": {
            "exShowroomPrice": 3168000,
            "engineCC": 2596
          },
          "4400WB 13Str": {
            "exShowroomPrice": 3183000,
            "engineCC": 2596
          },
          "4400WB 14Str": {
            "exShowroomPrice": 3432000,
            "engineCC": 2596
          },
          "3350WB 11Str": {
            "exShowroomPrice": 2634000,
            "engineCC": 2596
          }
        }
      }
    }
  },
  "Honda": {
    "Amaze": {
      "bodyType": "Sedan",
      "fuelTypes": {
        "Petrol": [
          "V",
          "V CVT",
          "VX",
          "VX CVT",
          "ZX",
          "ZX CVT"
        ]
      },
      "basePrice": 765000,
      "variantPrices": {
        "Petrol": {
          "V CVT": {
            "exShowroomPrice": 870000,
            "engineCC": 1199
          },
          "ZX CVT": {
            "exShowroomPrice": 1000000,
            "engineCC": 1199
          },
          "ZX": {
            "exShowroomPrice": 939000,
            "engineCC": 1199
          },
          "VX": {
            "exShowroomPrice": 865000,
            "engineCC": 1199
          },
          "VX CVT": {
            "exShowroomPrice": 940000,
            "engineCC": 1199
          },
          "V": {
            "exShowroomPrice": 765000,
            "engineCC": 1199
          }
        }
      }
    },
    "Amaze 2nd Gen": {
      "bodyType": "Sedan",
      "fuelTypes": {
        "Petrol": [
          "S",
          "S CVT"
        ]
      },
      "basePrice": 599000,
      "variantPrices": {
        "Petrol": {
          "S": {
            "exShowroomPrice": 599000,
            "engineCC": 1199
          },
          "S CVT": {
            "exShowroomPrice": 780000,
            "engineCC": 1199
          }
        }
      }
    },
    "City": {
      "bodyType": "Sedan",
      "fuelTypes": {
        "Petrol": [
          "SV",
          "V",
          "V CVT",
          "ZX",
          "ZX CVT",
          "ZX Plus",
          "ZX Plus CVT",
          "ZX Plus Hybrid"
        ],
        "Petrol Hybrid": [
          "ZX Plus Hybrid"
        ]
      },
      "basePrice": 1200000,
      "variantPrices": {
        "Petrol": {
          "ZX Plus": {
            "exShowroomPrice": 1636000,
            "engineCC": 1498
          },
          "V": {
            "exShowroomPrice": 1351000,
            "engineCC": 1498
          },
          "ZX Plus CVT": {
            "exShowroomPrice": 1736000,
            "engineCC": 1498
          },
          "ZX": {
            "exShowroomPrice": 1547000,
            "engineCC": 1498
          },
          "V CVT": {
            "exShowroomPrice": 1451000,
            "engineCC": 1498
          },
          "SV": {
            "exShowroomPrice": 1200000,
            "engineCC": 1498
          },
          "ZX Plus Hybrid": {
            "exShowroomPrice": 2136000,
            "engineCC": 1498
          },
          "ZX CVT": {
            "exShowroomPrice": 1647000,
            "engineCC": 1498
          }
        },
        "Petrol Hybrid": {}
      }
    },
    "Elevate": {
      "bodyType": "SUV",
      "fuelTypes": {
        "Petrol": [
          "ADV Edition",
          "ADV Edition CVT",
          "ADV Edition CVT Dual Tone",
          "ADV Edition Dual Tone",
          "SV",
          "V",
          "V CVT",
          "VX",
          "VX CVT",
          "ZX",
          "ZX Black Edition",
          "ZX Black Edition CVT",
          "ZX CVT"
        ]
      },
      "basePrice": 1181000,
      "variantPrices": {
        "Petrol": {
          "ADV Edition CVT": {
            "exShowroomPrice": 1678000,
            "engineCC": 1498
          },
          "ADV Edition CVT Dual Tone": {
            "exShowroomPrice": 1698000,
            "engineCC": 1498
          },
          "ZX Black Edition CVT": {
            "exShowroomPrice": 1646000,
            "engineCC": 1498
          },
          "SV": {
            "exShowroomPrice": 1181000,
            "engineCC": 1498
          },
          "ADV Edition Dual Tone": {
            "exShowroomPrice": 1580000,
            "engineCC": 1498
          },
          "ZX CVT": {
            "exShowroomPrice": 1636000,
            "engineCC": 1498
          },
          "ZX": {
            "exShowroomPrice": 1519000,
            "engineCC": 1498
          },
          "VX": {
            "exShowroomPrice": 1392000,
            "engineCC": 1498
          },
          "ZX Black Edition": {
            "exShowroomPrice": 1528000,
            "engineCC": 1498
          },
          "ADV Edition": {
            "exShowroomPrice": 1560000,
            "engineCC": 1498
          },
          "VX CVT": {
            "exShowroomPrice": 1508000,
            "engineCC": 1498
          },
          "V CVT": {
            "exShowroomPrice": 1343000,
            "engineCC": 1498
          },
          "V": {
            "exShowroomPrice": 1227000,
            "engineCC": 1498
          }
        }
      }
    },
    "ZR-V": {
      "bodyType": "SUV",
      "fuelTypes": {
        "Petrol": [
          "Hybrid"
        ],
        "Petrol Hybrid": [
          "e:HEV (single/top trim)"
        ]
      },
      "basePrice": 4799000,
      "variantPrices": {
        "Petrol": {
          "Hybrid": {
            "exShowroomPrice": 4799000,
            "engineCC": 1993
          }
        },
        "Petrol Hybrid": {}
      }
    }
  },
  "Hyundai": {
    "Alcazar": {
      "bodyType": "Midsize SUV (6/7-seat)",
      "fuelTypes": {
        "Petrol": [
          "Executive",
          "Platinum",
          "Platinum 6Str DCT",
          "Platinum 6Str DT DCT",
          "Platinum DCT",
          "Platinum DT",
          "Platinum DT DCT",
          "Prestige",
          "Prestige DCT",
          "Signature",
          "Signature 6Str DCT",
          "Signature 6Str DT DCT",
          "Signature DCT",
          "Signature DCT Knight",
          "Signature DT DCT"
        ],
        "Diesel": [
          "Corporate",
          "Corporate AT",
          "Executive",
          "Platinum",
          "Platinum 6Str AT",
          "Platinum 6Str AT DT",
          "Platinum AT",
          "Platinum AT DT",
          "Platinum DT",
          "Prestige",
          "Signature",
          "Signature 6Str AT",
          "Signature 6Str AT DT",
          "Signature AT",
          "Signature AT DT",
          "Signature AT Knight"
        ]
      },
      "basePrice": 1451000,
      "variantPrices": {
        "Petrol": {
          "Signature DCT": {
            "exShowroomPrice": 2091000,
            "engineCC": 1482
          },
          "Signature DT DCT": {
            "exShowroomPrice": 2106000,
            "engineCC": 1482
          },
          "Platinum DT": {
            "exShowroomPrice": 1907000,
            "engineCC": 1482
          },
          "Signature 6Str DT DCT": {
            "exShowroomPrice": 2125000,
            "engineCC": 1482
          },
          "Executive": {
            "exShowroomPrice": 1451000,
            "engineCC": 1482
          },
          "Prestige DCT": {
            "exShowroomPrice": 1803000,
            "engineCC": 1482
          },
          "Platinum 6Str DCT": {
            "exShowroomPrice": 2031000,
            "engineCC": 1482
          },
          "Signature 6Str DCT": {
            "exShowroomPrice": 2110000,
            "engineCC": 1482
          },
          "Platinum": {
            "exShowroomPrice": 1896000,
            "engineCC": 1482
          },
          "Signature DCT Knight": {
            "exShowroomPrice": 2105000,
            "engineCC": 1482
          },
          "Platinum 6Str DT DCT": {
            "exShowroomPrice": 2046000,
            "engineCC": 1482
          },
          "Prestige": {
            "exShowroomPrice": 1676000,
            "engineCC": 1482
          },
          "Platinum DCT": {
            "exShowroomPrice": 2022000,
            "engineCC": 1482
          },
          "Platinum DT DCT": {
            "exShowroomPrice": 2037000,
            "engineCC": 1482
          }
        },
        "Diesel": {
          "Corporate AT": {
            "exShowroomPrice": 1876000,
            "engineCC": 1493
          },
          "Signature AT Knight": {
            "exShowroomPrice": 2105000,
            "engineCC": 1493
          },
          "Signature AT DT": {
            "exShowroomPrice": 2106000,
            "engineCC": 1493
          },
          "Platinum": {
            "exShowroomPrice": 1896000,
            "engineCC": 1493
          },
          "Prestige": {
            "exShowroomPrice": 1662000,
            "engineCC": 1493
          },
          "Platinum AT": {
            "exShowroomPrice": 2022000,
            "engineCC": 1493
          },
          "Platinum 6Str AT": {
            "exShowroomPrice": 2031000,
            "engineCC": 1493
          },
          "Signature AT": {
            "exShowroomPrice": 2091000,
            "engineCC": 1493
          },
          "Executive": {
            "exShowroomPrice": 1550000,
            "engineCC": 1493
          },
          "Signature 6Str AT DT": {
            "exShowroomPrice": 2125000,
            "engineCC": 1493
          },
          "Corporate": {
            "exShowroomPrice": 1739000,
            "engineCC": 1493
          },
          "Platinum 6Str AT DT": {
            "exShowroomPrice": 2046000,
            "engineCC": 1493
          },
          "Platinum DT": {
            "exShowroomPrice": 1907000,
            "engineCC": 1493
          },
          "Signature 6Str AT": {
            "exShowroomPrice": 2110000,
            "engineCC": 1493
          },
          "Platinum AT DT": {
            "exShowroomPrice": 2037000,
            "engineCC": 1493
          }
        }
      }
    },
    "Aura": {
      "bodyType": "Compact Sedan",
      "fuelTypes": {
        "Petrol": [
          "E",
          "S",
          "S AMT",
          "S Corporate",
          "SX",
          "SX Option",
          "SX Plus AMT",
          "SX(O)",
          "SX+",
          "Turbo GDi SX+/SX(O)"
        ],
        "CNG": [
          "CNG variant (S/SX)",
          "E",
          "S",
          "S Corporate",
          "SX"
        ],
        "Diesel": [
          "S",
          "SX",
          "SX+"
        ]
      },
      "basePrice": 600000,
      "variantPrices": {
        "Petrol": {
          "E": {
            "exShowroomPrice": 600000,
            "engineCC": 1197
          },
          "S AMT": {
            "exShowroomPrice": 739000,
            "engineCC": 1197
          },
          "S Corporate": {
            "exShowroomPrice": 684000,
            "engineCC": 1197
          },
          "S": {
            "exShowroomPrice": 691000,
            "engineCC": 1197
          },
          "SX": {
            "exShowroomPrice": 770000,
            "engineCC": 1197
          },
          "SX Option": {
            "exShowroomPrice": 816000,
            "engineCC": 1197
          },
          "SX Plus AMT": {
            "exShowroomPrice": 835000,
            "engineCC": 1197
          },
          "SX+": {
            "exShowroomPrice": 770000,
            "engineCC": 1197,
            "source": "existing_variant_price_alias"
          }
        },
        "CNG": {
          "E": {
            "exShowroomPrice": 690000,
            "engineCC": 1197
          },
          "S": {
            "exShowroomPrice": 782000,
            "engineCC": 1197
          },
          "S Corporate": {
            "exShowroomPrice": 791000,
            "engineCC": 1197
          },
          "SX": {
            "exShowroomPrice": 860000,
            "engineCC": 1197
          }
        },
        "Diesel": {}
      }
    },
    "Creta": {
      "bodyType": "SUV",
      "fuelTypes": {
        "Petrol": [
          "E",
          "EX",
          "EX (O)",
          "EX (O) iVT Summer Edition",
          "EX (O) Summer Edition",
          "EX Summer Edition",
          "EX(O) iVT",
          "King",
          "King DT",
          "King iVT",
          "King iVT DT",
          "King Knight iVT",
          "King Knight iVT DT",
          "King Turbo DCT",
          "King Turbo DCT DT",
          "S",
          "S (O)",
          "S (O) iVT",
          "S (O) iVT Summer Edition",
          "S (O) Knight",
          "S (O) Summer Edition",
          "S(O) Knight Summer Edition",
          "SX",
          "SX DT",
          "SX Premium",
          "SX Premium DT",
          "SX Premium iVT",
          "SX Premium iVT DT",
          "SX Premium iVT Summer Edition",
          "SX Premium Summer Edition",
          "SX Summer Edition",
          "SX(O)"
        ],
        "Diesel": [
          "E",
          "EX",
          "EX (O)",
          "EX (O) AT",
          "EX (O) AT Summer Edition",
          "EX (O) Summer Edition",
          "EX Summer Edition",
          "King",
          "King AT",
          "King AT DT",
          "King DT",
          "S",
          "S (O)",
          "S (O) AT",
          "S (O) AT Summer Edition",
          "S (O) Knight",
          "S (O) Knight Summer Edition",
          "S (O) Summer Edition",
          "SX",
          "SX Premium",
          "SX Premium DT",
          "SX Premium Summer Edition",
          "SX(O)"
        ]
      },
      "basePrice": 1091000,
      "variantPrices": {
        "Petrol": {
          "S (O) iVT": {
            "exShowroomPrice": 1566000,
            "engineCC": 1497
          },
          "SX Premium iVT Summer Edition": {
            "exShowroomPrice": 1778000,
            "engineCC": 1497
          },
          "King Turbo DCT": {
            "exShowroomPrice": 1991000,
            "engineCC": 1482
          },
          "King Knight iVT": {
            "exShowroomPrice": 1883000,
            "engineCC": 1497
          },
          "EX (O)": {
            "exShowroomPrice": 1314000,
            "engineCC": 1497
          },
          "S (O) iVT Summer Edition": {
            "exShowroomPrice": 1565000,
            "engineCC": 1497
          },
          "King iVT DT": {
            "exShowroomPrice": 1884000,
            "engineCC": 1497
          },
          "SX Premium DT": {
            "exShowroomPrice": 1649000,
            "engineCC": 1497
          },
          "S (O)": {
            "exShowroomPrice": 1421000,
            "engineCC": 1497
          },
          "SX Summer Edition": {
            "exShowroomPrice": 1504000,
            "engineCC": 1497
          },
          "King Turbo DCT DT": {
            "exShowroomPrice": 2006000,
            "engineCC": 1482
          },
          "King DT": {
            "exShowroomPrice": 1743000,
            "engineCC": 1497
          },
          "E": {
            "exShowroomPrice": 1091000,
            "engineCC": 1497
          },
          "S(O) Knight Summer Edition": {
            "exShowroomPrice": 1438000,
            "engineCC": 1497
          },
          "King iVT": {
            "exShowroomPrice": 1869000,
            "engineCC": 1497
          },
          "S (O) Knight": {
            "exShowroomPrice": 1439000,
            "engineCC": 1497
          },
          "SX Premium iVT DT": {
            "exShowroomPrice": 1794000,
            "engineCC": 1497
          },
          "SX Premium": {
            "exShowroomPrice": 1634000,
            "engineCC": 1497
          },
          "King": {
            "exShowroomPrice": 1728000,
            "engineCC": 1497
          },
          "EX(O) iVT": {
            "exShowroomPrice": 1450000,
            "engineCC": 1497
          },
          "EX": {
            "exShowroomPrice": 1207000,
            "engineCC": 1497
          },
          "EX (O) iVT Summer Edition": {
            "exShowroomPrice": 1449000,
            "engineCC": 1497
          },
          "EX Summer Edition": {
            "exShowroomPrice": 1206000,
            "engineCC": 1497
          },
          "EX (O) Summer Edition": {
            "exShowroomPrice": 1313000,
            "engineCC": 1497
          },
          "S (O) Summer Edition": {
            "exShowroomPrice": 1420000,
            "engineCC": 1497
          },
          "SX Premium Summer Edition": {
            "exShowroomPrice": 1633000,
            "engineCC": 1497
          },
          "SX": {
            "exShowroomPrice": 1504000,
            "engineCC": 1497
          },
          "SX DT": {
            "exShowroomPrice": 1519000,
            "engineCC": 1497
          },
          "SX Premium iVT": {
            "exShowroomPrice": 1779000,
            "engineCC": 1497
          },
          "King Knight iVT DT": {
            "exShowroomPrice": 1897000,
            "engineCC": 1497
          }
        },
        "Diesel": {
          "King DT": {
            "exShowroomPrice": 1901000,
            "engineCC": 1493
          },
          "EX": {
            "exShowroomPrice": 1366000,
            "engineCC": 1493
          },
          "S (O) AT Summer Edition": {
            "exShowroomPrice": 1726000,
            "engineCC": 1493
          },
          "EX (O) Summer Edition": {
            "exShowroomPrice": 1469000,
            "engineCC": 1493
          },
          "EX Summer Edition": {
            "exShowroomPrice": 1362000,
            "engineCC": 1493
          },
          "S (O)": {
            "exShowroomPrice": 1585000,
            "engineCC": 1493
          },
          "S (O) Summer Edition": {
            "exShowroomPrice": 1581000,
            "engineCC": 1493
          },
          "E": {
            "exShowroomPrice": 1253000,
            "engineCC": 1493
          },
          "SX Premium Summer Edition": {
            "exShowroomPrice": 1789000,
            "engineCC": 1493
          },
          "EX (O) AT Summer Edition": {
            "exShowroomPrice": 1605000,
            "engineCC": 1493
          },
          "King": {
            "exShowroomPrice": 1886000,
            "engineCC": 1493
          },
          "S (O) Knight": {
            "exShowroomPrice": 1603000,
            "engineCC": 1493
          },
          "SX Premium": {
            "exShowroomPrice": 1793000,
            "engineCC": 1493
          },
          "S (O) AT": {
            "exShowroomPrice": 1730000,
            "engineCC": 1493
          },
          "King AT DT": {
            "exShowroomPrice": 1993000,
            "engineCC": 1493
          },
          "EX (O) AT": {
            "exShowroomPrice": 1608000,
            "engineCC": 1493
          },
          "EX (O)": {
            "exShowroomPrice": 1473000,
            "engineCC": 1493
          },
          "S (O) Knight Summer Edition": {
            "exShowroomPrice": 1599000,
            "engineCC": 1493
          },
          "SX Premium DT": {
            "exShowroomPrice": 1808000,
            "engineCC": 1493
          },
          "King AT": {
            "exShowroomPrice": 1978000,
            "engineCC": 1493
          }
        }
      }
    },
    "Creta Electric": {
      "bodyType": "Compact SUV (Electric)",
      "fuelTypes": {
        "Electric": [
          "Creta Excellence",
          "Creta Excellence DT",
          "Creta Excellence HC",
          "Creta Excellence HC DT",
          "Creta Excellence HC Knight",
          "Creta Excellence HC Knight DT",
          "Creta Excellence Knight",
          "Creta Excellence Knight DT",
          "Creta Excellence LR",
          "Creta Excellence LR DT",
          "Creta Excellence LR HC",
          "Creta Excellence LR HC DT",
          "Creta Excellence LR HC Knight",
          "Creta Excellence LR HC Knight DT",
          "Creta Excellence LR Knight",
          "Creta Excellence LR Knight DT",
          "Creta Executive",
          "Creta Executive (O) LR",
          "Creta Executive Tech",
          "Creta Premium",
          "Creta Premium DT",
          "Creta Premium HC",
          "Creta Premium HC DT",
          "Creta Smart (O) LR",
          "Creta Smart (O) LR HC",
          "Excellence",
          "Executive",
          "Premium",
          "Smart"
        ]
      },
      "basePrice": 1803000,
      "variantPrices": {
        "Electric": {
          "Creta Excellence LR": {
            "exShowroomPrice": 2367000
          },
          "Creta Excellence HC Knight DT": {
            "exShowroomPrice": 2233000
          },
          "Creta Excellence HC Knight": {
            "exShowroomPrice": 2233000
          },
          "Creta Excellence LR HC Knight": {
            "exShowroomPrice": 2455000
          },
          "Creta Premium": {
            "exShowroomPrice": 2000000
          },
          "Creta Premium HC DT": {
            "exShowroomPrice": 2089000
          },
          "Creta Executive": {
            "exShowroomPrice": 1803000
          },
          "Creta Excellence LR HC Knight DT": {
            "exShowroomPrice": 2470000
          },
          "Creta Executive (O) LR": {
            "exShowroomPrice": 2000000
          },
          "Creta Excellence LR Knight": {
            "exShowroomPrice": 2382000
          },
          "Creta Excellence HC": {
            "exShowroomPrice": 2233000
          },
          "Creta Premium HC": {
            "exShowroomPrice": 2089000
          },
          "Creta Excellence": {
            "exShowroomPrice": 2367000
          },
          "Creta Excellence LR Knight DT": {
            "exShowroomPrice": 2397000
          },
          "Creta Smart (O) LR HC": {
            "exShowroomPrice": 2227000
          },
          "Creta Excellence LR DT": {
            "exShowroomPrice": 2382000
          },
          "Creta Excellence LR HC": {
            "exShowroomPrice": 2455000
          },
          "Creta Excellence DT": {
            "exShowroomPrice": 2145000
          },
          "Creta Excellence HC DT": {
            "exShowroomPrice": 2218000
          },
          "Creta Smart (O) LR": {
            "exShowroomPrice": 2227000
          },
          "Creta Premium DT": {
            "exShowroomPrice": 2016000
          },
          "Creta Excellence LR HC DT": {
            "exShowroomPrice": 2455000
          },
          "Creta Excellence Knight DT": {
            "exShowroomPrice": 2160000
          },
          "Creta Executive Tech": {
            "exShowroomPrice": 1900000
          },
          "Creta Excellence Knight": {
            "exShowroomPrice": 2160000
          }
        }
      }
    },
    "Creta N Line": {
      "bodyType": "SUV",
      "fuelTypes": {
        "Petrol": [
          "N10 DCT Dual Tone",
          "N10 DCT",
          "N10 Dual Tone",
          "N10"
        ]
      },
      "basePrice": 1903000,
      "variantPrices": {
        "Petrol": {
          "N10 DCT Dual Tone": {
            "exShowroomPrice": 2010000,
            "engineCC": 1482
          },
          "N10 DCT": {
            "exShowroomPrice": 1995000,
            "engineCC": 1482
          },
          "N10 Dual Tone": {
            "exShowroomPrice": 1918000,
            "engineCC": 1482
          },
          "N10": {
            "exShowroomPrice": 1903000,
            "engineCC": 1482
          }
        }
      }
    },
    "Exter": {
      "bodyType": "Micro SUV",
      "fuelTypes": {
        "Petrol": [
          "EX",
          "HX2",
          "HX3",
          "HX3 AMT",
          "HX4",
          "HX4 Plus AMT",
          "HX6",
          "HX6 AMT",
          "HX6 AMT DT",
          "HX6 DT",
          "HX6 Knight",
          "HX6 Knight AMT",
          "HX8",
          "HX8 AMT",
          "HX10 AMT",
          "HX10 AMT DT",
          "HX10 Knight AMT",
          "S",
          "SX",
          "SX(O)"
        ],
        "CNG": [
          "CNG variant (S/SX)",
          "HX2",
          "HX3",
          "HX4",
          "HX6",
          "HX6 DT",
          "HX6 Knight",
          "HX8"
        ]
      },
      "basePrice": 581000,
      "variantPrices": {
        "Petrol": {
          "HX10 AMT DT": {
            "exShowroomPrice": 961000,
            "engineCC": 1197
          },
          "HX3 AMT": {
            "exShowroomPrice": 695000,
            "engineCC": 1197
          },
          "HX6": {
            "exShowroomPrice": 799000,
            "engineCC": 1197
          },
          "HX4": {
            "exShowroomPrice": 728000,
            "engineCC": 1197
          },
          "HX6 Knight": {
            "exShowroomPrice": 813000,
            "engineCC": 1197
          },
          "HX10 AMT": {
            "exShowroomPrice": 946000,
            "engineCC": 1197
          },
          "HX2": {
            "exShowroomPrice": 581000,
            "engineCC": 1197
          },
          "HX8": {
            "exShowroomPrice": 840000,
            "engineCC": 1197
          },
          "HX10 Knight AMT": {
            "exShowroomPrice": 961000,
            "engineCC": 1197
          },
          "HX6 AMT DT": {
            "exShowroomPrice": 874000,
            "engineCC": 1197
          },
          "HX3": {
            "exShowroomPrice": 630000,
            "engineCC": 1197
          },
          "HX8 AMT": {
            "exShowroomPrice": 912000,
            "engineCC": 1197
          },
          "HX4 Plus AMT": {
            "exShowroomPrice": 810000,
            "engineCC": 1197
          },
          "HX6 Knight AMT": {
            "exShowroomPrice": 873000,
            "engineCC": 1197
          },
          "HX6 AMT": {
            "exShowroomPrice": 859000,
            "engineCC": 1197
          },
          "HX6 DT": {
            "exShowroomPrice": 814000,
            "engineCC": 1197
          }
        },
        "CNG": {
          "HX8": {
            "exShowroomPrice": 942000,
            "engineCC": 1197
          },
          "HX3": {
            "exShowroomPrice": 745000,
            "engineCC": 1197
          },
          "HX6 DT": {
            "exShowroomPrice": 910000,
            "engineCC": 1197
          },
          "HX2": {
            "exShowroomPrice": 700000,
            "engineCC": 1197
          },
          "HX4": {
            "exShowroomPrice": 828000,
            "engineCC": 1197
          },
          "HX6": {
            "exShowroomPrice": 895000,
            "engineCC": 1197
          },
          "HX6 Knight": {
            "exShowroomPrice": 910000,
            "engineCC": 1197
          }
        }
      }
    },
    "Grand i10 Nios": {
      "bodyType": "Hatchback",
      "fuelTypes": {
        "Petrol": [
          "Asta",
          "Asta AMT",
          "Asta VIBE Edition",
          "Asta VIBE Edition AMT",
          "Corporate",
          "Corporate AMT",
          "Era",
          "Magna",
          "Magna AMT",
          "Sportz",
          "Sportz AMT",
          "Sportz DT",
          "Sportz Opt",
          "Sportz Opt AMT",
          "Sportz Opt VIBE Edition AMT",
          "Sportz VIBE Edition",
          "Sportz VIBE Edition AMT"
        ],
        "CNG": [
          "CNG variant (Magna/Sportz)",
          "Magna",
          "Sportz",
          "Sportz Duo"
        ]
      },
      "basePrice": 560000,
      "variantPrices": {
        "Petrol": {
          "Asta AMT": {
            "exShowroomPrice": 804000,
            "engineCC": 1197
          },
          "Sportz Opt AMT": {
            "exShowroomPrice": 767000,
            "engineCC": 1197
          },
          "Asta": {
            "exShowroomPrice": 752000,
            "engineCC": 1197
          },
          "Sportz VIBE Edition": {
            "exShowroomPrice": 711000,
            "engineCC": 1197
          },
          "Sportz DT": {
            "exShowroomPrice": 701000,
            "engineCC": 1197
          },
          "Sportz Opt VIBE Edition AMT": {
            "exShowroomPrice": 775000,
            "engineCC": 1197
          },
          "Corporate": {
            "exShowroomPrice": 656000,
            "engineCC": 1197
          },
          "Asta VIBE Edition AMT": {
            "exShowroomPrice": 803000,
            "engineCC": 1197
          },
          "Corporate AMT": {
            "exShowroomPrice": 717000,
            "engineCC": 1197
          },
          "Magna": {
            "exShowroomPrice": 633000,
            "engineCC": 1197
          },
          "Sportz Opt": {
            "exShowroomPrice": 713000,
            "engineCC": 1197
          },
          "Sportz AMT": {
            "exShowroomPrice": 740000,
            "engineCC": 1197
          },
          "Sportz": {
            "exShowroomPrice": 688000,
            "engineCC": 1197
          },
          "Asta VIBE Edition": {
            "exShowroomPrice": 751000,
            "engineCC": 1197
          },
          "Magna AMT": {
            "exShowroomPrice": 685000,
            "engineCC": 1197
          },
          "Era": {
            "exShowroomPrice": 560000,
            "engineCC": 1197
          },
          "Sportz VIBE Edition AMT": {
            "exShowroomPrice": 763000,
            "engineCC": 1197
          }
        },
        "CNG": {
          "Magna": {
            "exShowroomPrice": 727000,
            "engineCC": 1197
          },
          "Sportz": {
            "exShowroomPrice": 759000,
            "engineCC": 1197
          },
          "Sportz Duo": {
            "exShowroomPrice": 777000,
            "engineCC": 1197
          }
        }
      }
    },
    "Prime HB": {
      "bodyType": "Car",
      "fuelTypes": {
        "CNG": [
          "Prime HB"
        ]
      },
      "basePrice": 600000,
      "variantPrices": {
        "CNG": {
          "Prime HB": {
            "exShowroomPrice": 600000,
            "engineCC": 1197
          }
        }
      }
    },
    "Prime SD": {
      "bodyType": "Car",
      "fuelTypes": {
        "CNG": [
          "Prime SD"
        ]
      },
      "basePrice": 696000,
      "variantPrices": {
        "CNG": {
          "Prime SD": {
            "exShowroomPrice": 696000,
            "engineCC": 1197
          }
        }
      }
    },
    "Venue": {
      "bodyType": "Compact SUV (sub-4m)",
      "fuelTypes": {
        "Petrol": [
          "E",
          "HX 2",
          "HX 2 Turbo",
          "HX 4",
          "HX 5",
          "HX 5 Knight",
          "HX 5 Plus",
          "HX 5 Plus Dual Tone",
          "HX 5 Turbo",
          "HX 5 Turbo DCT",
          "HX 6",
          "HX 6 Dual Tone",
          "HX 6 Turbo DCT",
          "HX 6 Turbo DCT DT",
          "HX 6T",
          "HX 6T Dual Tone",
          "HX 6T Knight",
          "HX 6T Knight DT",
          "HX 8 Turbo",
          "HX 8 Turbo DCT",
          "HX 8 Turbo DCT Dual Tone",
          "HX 8 Turbo Dual Tone",
          "HX 10 Knight Turbo DCT",
          "HX 10 Knight Turbo DCT DT",
          "HX 10 Turbo DCT",
          "HX 10 Turbo DCT Dual Tone",
          "S",
          "S+",
          "SX",
          "SX(O)"
        ],
        "Diesel": [
          "E",
          "HX 2",
          "HX 5",
          "HX 5 AT",
          "HX 5 Knight",
          "HX 7",
          "HX 7 Dual Tone",
          "HX 8 AT",
          "HX 8 AT Dual Tone",
          "HX 8 Knight AT",
          "HX 8 Knight AT DT",
          "HX 10 AT",
          "HX 10 AT Dual Tone",
          "S",
          "SX",
          "SX(O)"
        ]
      },
      "basePrice": 800000,
      "variantPrices": {
        "Petrol": {
          "HX 5 Turbo DCT": {
            "exShowroomPrice": 1092000,
            "engineCC": 998
          },
          "HX 4": {
            "exShowroomPrice": 900000,
            "engineCC": 1197
          },
          "HX 10 Knight Turbo DCT DT": {
            "exShowroomPrice": 1498000,
            "engineCC": 998
          },
          "HX 5 Plus Dual Tone": {
            "exShowroomPrice": 1018000,
            "engineCC": 1197
          },
          "HX 8 Turbo DCT Dual Tone": {
            "exShowroomPrice": 1318000,
            "engineCC": 998
          },
          "HX 10 Knight Turbo DCT": {
            "exShowroomPrice": 1480000,
            "engineCC": 998
          },
          "HX 8 Turbo DCT": {
            "exShowroomPrice": 1300000,
            "engineCC": 998
          },
          "HX 8 Turbo": {
            "exShowroomPrice": 1191000,
            "engineCC": 998
          },
          "HX 5 Turbo": {
            "exShowroomPrice": 990000,
            "engineCC": 998
          },
          "HX 6T": {
            "exShowroomPrice": 1089000,
            "engineCC": 1197
          },
          "HX 5 Knight": {
            "exShowroomPrice": 971000,
            "engineCC": 1197
          },
          "HX 6 Turbo DCT": {
            "exShowroomPrice": 1218000,
            "engineCC": 998
          },
          "HX 5 Plus": {
            "exShowroomPrice": 1000000,
            "engineCC": 1197
          },
          "HX 10 Turbo DCT Dual Tone": {
            "exShowroomPrice": 1483000,
            "engineCC": 998
          },
          "HX 6T Dual Tone": {
            "exShowroomPrice": 1107000,
            "engineCC": 1197
          },
          "HX 5": {
            "exShowroomPrice": 956000,
            "engineCC": 1197
          },
          "HX 6": {
            "exShowroomPrice": 1043000,
            "engineCC": 1197
          },
          "HX 6 Dual Tone": {
            "exShowroomPrice": 1061000,
            "engineCC": 1197
          },
          "HX 2 Turbo": {
            "exShowroomPrice": 891000,
            "engineCC": 998
          },
          "HX 8 Turbo Dual Tone": {
            "exShowroomPrice": 1209000,
            "engineCC": 998
          },
          "HX 6 Turbo DCT DT": {
            "exShowroomPrice": 1236000,
            "engineCC": 998
          },
          "HX 2": {
            "exShowroomPrice": 800000,
            "engineCC": 1197
          },
          "HX 6T Knight DT": {
            "exShowroomPrice": 1122000,
            "engineCC": 1197
          },
          "HX 10 Turbo DCT": {
            "exShowroomPrice": 1465000,
            "engineCC": 998
          },
          "HX 6T Knight": {
            "exShowroomPrice": 1104000,
            "engineCC": 1197
          }
        },
        "Diesel": {
          "HX 8 Knight AT DT": {
            "exShowroomPrice": 1404000,
            "engineCC": 1493
          },
          "HX 10 AT": {
            "exShowroomPrice": 1565000,
            "engineCC": 1493
          },
          "HX 8 AT": {
            "exShowroomPrice": 1371000,
            "engineCC": 1493
          },
          "HX 8 Knight AT": {
            "exShowroomPrice": 1386000,
            "engineCC": 1493
          },
          "HX 5": {
            "exShowroomPrice": 1094000,
            "engineCC": 1493
          },
          "HX 7": {
            "exShowroomPrice": 1276000,
            "engineCC": 1493
          },
          "HX 5 AT": {
            "exShowroomPrice": 1188000,
            "engineCC": 1493
          },
          "HX 5 Knight": {
            "exShowroomPrice": 1112000,
            "engineCC": 1493
          },
          "HX 2": {
            "exShowroomPrice": 995000,
            "engineCC": 1493
          },
          "HX 8 AT Dual Tone": {
            "exShowroomPrice": 1389000,
            "engineCC": 1493
          },
          "HX 10 AT Dual Tone": {
            "exShowroomPrice": 1583000,
            "engineCC": 1493
          },
          "HX 7 Dual Tone": {
            "exShowroomPrice": 1294000,
            "engineCC": 1493
          }
        }
      }
    },
    "Venue N Line": {
      "bodyType": "Compact SUV (performance variant)",
      "fuelTypes": {
        "Petrol": [
          "N6",
          "N6 DCT",
          "N6 DCT Dual Tone",
          "N6 Dual Tone",
          "N8",
          "N10",
          "N10 DCT",
          "N10 DCT Dual Tone"
        ]
      },
      "basePrice": 1066000,
      "variantPrices": {
        "Petrol": {
          "N6": {
            "exShowroomPrice": 1066000,
            "engineCC": 998
          },
          "N6 Dual Tone": {
            "exShowroomPrice": 1084000,
            "engineCC": 998
          },
          "N6 DCT": {
            "exShowroomPrice": 1156000,
            "engineCC": 998
          },
          "N10 DCT": {
            "exShowroomPrice": 1549000,
            "engineCC": 998
          },
          "N10 DCT Dual Tone": {
            "exShowroomPrice": 1567000,
            "engineCC": 998
          },
          "N6 DCT Dual Tone": {
            "exShowroomPrice": 1174000,
            "engineCC": 998
          }
        }
      }
    },
    "Verna": {
      "bodyType": "Sedan",
      "fuelTypes": {
        "Petrol": [
          "E",
          "EX",
          "GL",
          "GLS",
          "HX2",
          "HX4",
          "HX6",
          "HX6 DT",
          "HX6 iVT",
          "HX6 iVT DT",
          "HX6 Plus",
          "HX6 Plus DT",
          "HX6 Plus iVT",
          "HX6 Plus iVT DT",
          "HX8",
          "HX8 DT",
          "HX8 iVT",
          "HX8 iVT DT",
          "HX8 Turbo",
          "HX8 Turbo DCT",
          "HX8 Turbo DCT DT",
          "HX8 Turbo DT",
          "HX10 iVT",
          "HX10 iVT DT",
          "HX10 Turbo DCT",
          "HX10 Turbo DCT DT",
          "S",
          "SX",
          "SX(O)",
          "VGT SX"
        ],
        "Diesel": [
          "CRDi GLE",
          "CRDi SX",
          "E",
          "EX",
          "S",
          "SX",
          "SX(O)",
          "VGT SX"
        ]
      },
      "basePrice": 1099000,
      "variantPrices": {
        "Petrol": {
          "HX2": {
            "exShowroomPrice": 1099000,
            "engineCC": 1497
          },
          "HX8 Turbo DT": {
            "exShowroomPrice": 1644000,
            "engineCC": 1482
          },
          "HX6 iVT": {
            "exShowroomPrice": 1441000,
            "engineCC": 1497
          },
          "HX8 iVT": {
            "exShowroomPrice": 1610000,
            "engineCC": 1497
          },
          "HX10 iVT": {
            "exShowroomPrice": 1716000,
            "engineCC": 1497
          },
          "HX10 iVT DT": {
            "exShowroomPrice": 1731000,
            "engineCC": 1497
          },
          "HX8 Turbo DCT": {
            "exShowroomPrice": 1763000,
            "engineCC": 1482
          },
          "HX10 Turbo DCT DT": {
            "exShowroomPrice": 1841000,
            "engineCC": 1482
          },
          "HX6 Plus iVT DT": {
            "exShowroomPrice": 1518000,
            "engineCC": 1497
          },
          "HX8 DT": {
            "exShowroomPrice": 1504000,
            "engineCC": 1497
          },
          "HX8": {
            "exShowroomPrice": 1489000,
            "engineCC": 1497
          },
          "HX6": {
            "exShowroomPrice": 1320000,
            "engineCC": 1497
          },
          "HX6 Plus DT": {
            "exShowroomPrice": 1397000,
            "engineCC": 1497
          },
          "HX6 iVT DT": {
            "exShowroomPrice": 1456000,
            "engineCC": 1497
          },
          "HX8 Turbo": {
            "exShowroomPrice": 1629000,
            "engineCC": 1482
          },
          "HX6 DT": {
            "exShowroomPrice": 1335000,
            "engineCC": 1497
          },
          "HX10 Turbo DCT": {
            "exShowroomPrice": 1826000,
            "engineCC": 1482
          },
          "HX8 iVT DT": {
            "exShowroomPrice": 1625000,
            "engineCC": 1497
          },
          "HX8 Turbo DCT DT": {
            "exShowroomPrice": 1778000,
            "engineCC": 1482
          },
          "HX6 Plus": {
            "exShowroomPrice": 1382000,
            "engineCC": 1497
          },
          "HX4": {
            "exShowroomPrice": 1226000,
            "engineCC": 1497
          },
          "HX6 Plus iVT": {
            "exShowroomPrice": 1503000,
            "engineCC": 1497
          }
        },
        "Diesel": {}
      }
    },
    "i20": {
      "bodyType": "Hatchback",
      "fuelTypes": {
        "Petrol": [
          "Asta",
          "Asta Opt",
          "Asta Opt DT",
          "Asta Opt IVT",
          "Asta Opt IVT DT",
          "Asta Opt iVT Knight",
          "Asta Opt iVT Knight DT",
          "Asta(O)",
          "Era",
          "Magna",
          "Magna Executive",
          "N Line",
          "Sportz",
          "Sportz IVT",
          "Sportz Opt",
          "Sportz Opt IVT",
          "Sportz Opt Knight"
        ],
        "Diesel": [
          "Asta",
          "Magna",
          "Sportz"
        ]
      },
      "basePrice": 600000,
      "variantPrices": {
        "Petrol": {
          "Magna": {
            "exShowroomPrice": 700000,
            "engineCC": 1197
          },
          "Sportz Opt Knight": {
            "exShowroomPrice": 843000,
            "engineCC": 1197
          },
          "Sportz": {
            "exShowroomPrice": 780000,
            "engineCC": 1197
          },
          "Asta Opt iVT Knight DT": {
            "exShowroomPrice": 1063000,
            "engineCC": 1197
          },
          "Sportz Opt IVT": {
            "exShowroomPrice": 926000,
            "engineCC": 1197
          },
          "Sportz Opt": {
            "exShowroomPrice": 834000,
            "engineCC": 1197
          },
          "Asta Opt iVT Knight": {
            "exShowroomPrice": 1048000,
            "engineCC": 1197
          },
          "Asta Opt": {
            "exShowroomPrice": 920000,
            "engineCC": 1197
          },
          "Magna Executive": {
            "exShowroomPrice": 675000,
            "engineCC": 1197
          },
          "Era": {
            "exShowroomPrice": 600000,
            "engineCC": 1197
          },
          "Asta Opt IVT": {
            "exShowroomPrice": 1039000,
            "engineCC": 1197
          },
          "Asta Opt DT": {
            "exShowroomPrice": 935000,
            "engineCC": 1197
          },
          "Sportz IVT": {
            "exShowroomPrice": 881000,
            "engineCC": 1197
          },
          "Asta": {
            "exShowroomPrice": 866000,
            "engineCC": 1197
          },
          "Asta Opt IVT DT": {
            "exShowroomPrice": 1054000,
            "engineCC": 1197
          }
        },
        "Diesel": {}
      }
    },
    "i20 N Line": {
      "bodyType": "Hatchback",
      "fuelTypes": {
        "Petrol": [
          "i20 N-Line N8 DCT",
          "i20 N-Line N6 DCT Dual Tone",
          "i20 N-Line N8",
          "i20 N-Line N8 Dual Tone",
          "i20 N-Line N6 Dual Tone",
          "i20 N-Line N6",
          "i20 N-Line N6 DCT",
          "i20 N-Line N8 DCT Dual Tone"
        ]
      },
      "basePrice": 927000,
      "variantPrices": {
        "Petrol": {
          "i20 N-Line N8 DCT": {
            "exShowroomPrice": 1159000,
            "engineCC": 998
          },
          "i20 N-Line N6 DCT Dual Tone": {
            "exShowroomPrice": 1037000,
            "engineCC": 998
          },
          "i20 N-Line N8": {
            "exShowroomPrice": 1159000,
            "engineCC": 998
          },
          "i20 N-Line N8 Dual Tone": {
            "exShowroomPrice": 1073000,
            "engineCC": 998
          },
          "i20 N-Line N6 Dual Tone": {
            "exShowroomPrice": 932000,
            "engineCC": 998
          },
          "i20 N-Line N6": {
            "exShowroomPrice": 1037000,
            "engineCC": 998
          },
          "i20 N-Line N6 DCT": {
            "exShowroomPrice": 1037000,
            "engineCC": 998
          },
          "i20 N-Line N8 DCT Dual Tone": {
            "exShowroomPrice": 1174000,
            "engineCC": 998
          }
        }
      }
    }
  },
  "Isuzu": {
    "D-Max": {
      "bodyType": "Car",
      "fuelTypes": {
        "Diesel": [
          "Flat Deck HR AC 2.0",
          "Flat Deck HR 2.0",
          "EX CBC HR 2.0",
          "Flat Deck HR AC 1.2",
          "Flat Deck HR",
          "CBC HR 2.0"
        ]
      },
      "basePrice": 998000,
      "variantPrices": {
        "Diesel": {
          "Flat Deck HR AC 2.0": {
            "exShowroomPrice": 1088000,
            "engineCC": 2499
          },
          "Flat Deck HR 2.0": {
            "exShowroomPrice": 1037000,
            "engineCC": 2499
          },
          "EX CBC HR 2.0": {
            "exShowroomPrice": 998000,
            "engineCC": 2499
          },
          "Flat Deck HR AC 1.2": {
            "exShowroomPrice": 1078000,
            "engineCC": 2499
          },
          "Flat Deck HR": {
            "exShowroomPrice": 1026000,
            "engineCC": 2499
          },
          "CBC HR 2.0": {
            "exShowroomPrice": 1019000,
            "engineCC": 2499
          }
        }
      }
    },
    "Hi-Lander": {
      "bodyType": "Car",
      "fuelTypes": {
        "Diesel": [
          "4x2 MT",
          "4x2 AT"
        ]
      },
      "basePrice": 2150000,
      "variantPrices": {
        "Diesel": {
          "4x2 MT": {
            "exShowroomPrice": 2150000,
            "engineCC": 1898
          },
          "4x2 AT": {
            "exShowroomPrice": 2360000,
            "engineCC": 1898
          }
        }
      }
    },
    "MU-X": {
      "bodyType": "Car",
      "fuelTypes": {
        "Diesel": [
          "4X2 AT",
          "4x4 AT"
        ]
      },
      "basePrice": 3453000,
      "variantPrices": {
        "Diesel": {
          "4X2 AT": {
            "exShowroomPrice": 3453000,
            "engineCC": 1898
          },
          "4x4 AT": {
            "exShowroomPrice": 3771000,
            "engineCC": 1898
          }
        }
      }
    },
    "S-CAB": {
      "bodyType": "Pickup",
      "fuelTypes": {
        "Diesel": [
          "EX CBC Hi-Ride",
          "Hi-Ride AC",
          "EX Hi-Ride"
        ]
      },
      "basePrice": 1044000,
      "variantPrices": {
        "Diesel": {
          "EX CBC Hi-Ride": {
            "exShowroomPrice": 1044000,
            "engineCC": 2499
          },
          "Hi-Ride AC": {
            "exShowroomPrice": 1275000,
            "engineCC": 2499
          },
          "EX Hi-Ride": {
            "exShowroomPrice": 1183000,
            "engineCC": 2499
          }
        }
      }
    },
    "S-CAB Z": {
      "bodyType": "Pickup",
      "fuelTypes": {
        "Diesel": [
          "4x2 MT"
        ]
      },
      "basePrice": 1590000,
      "variantPrices": {
        "Diesel": {
          "4x2 MT": {
            "exShowroomPrice": 1590000,
            "engineCC": 2499
          }
        }
      }
    },
    "V-Cross": {
      "bodyType": "Car",
      "fuelTypes": {
        "Diesel": [
          "4x4 Z Prestige",
          "4x4 Z Prestige AT",
          "4x4 Z"
        ]
      },
      "basePrice": 2550000,
      "variantPrices": {
        "Diesel": {
          "4x4 Z Prestige": {
            "exShowroomPrice": 2700000,
            "engineCC": 1898
          },
          "4x4 Z Prestige AT": {
            "exShowroomPrice": 3000000,
            "engineCC": 1898
          },
          "4x4 Z": {
            "exShowroomPrice": 2550000,
            "engineCC": 1898
          }
        }
      }
    }
  },
  "Jaguar": {
    "F-Pace": {
      "bodyType": "Car",
      "fuelTypes": {
        "Diesel": [
          "2.0 R-Dynamic S"
        ],
        "Petrol": [
          "2.0 R-Dynamic S"
        ]
      },
      "basePrice": 7290000,
      "variantPrices": {
        "Diesel": {
          "2.0 R-Dynamic S": {
            "exShowroomPrice": 7290000,
            "engineCC": 1997
          }
        },
        "Petrol": {
          "2.0 R-Dynamic S": {
            "exShowroomPrice": 7290000,
            "engineCC": 1997
          }
        }
      }
    }
  },
  "Jeep": {
    "Compass": {
      "bodyType": "Car",
      "fuelTypes": {
        "Diesel": [
          "Track Edition AT 4X4",
          "2.0 Limited Opt",
          "Trail Edition AT",
          "2.0 Limited Opt FWD AT",
          "Trail Edition",
          "Track Edition AT",
          "2.0 Longitude Opt",
          "Track Edition",
          "2.0 Sport",
          "2.0 Longitude Opt AT",
          "85th Anniversary Edition",
          "2.0 Model S Opt",
          "2.0 Model S Opt 4x4 AT",
          "2.0 Model S Opt FWD AT"
        ]
      },
      "basePrice": 1799000,
      "variantPrices": {
        "Diesel": {
          "Track Edition AT 4X4": {
            "exShowroomPrice": 3095000,
            "engineCC": 1956
          },
          "2.0 Limited Opt": {
            "exShowroomPrice": 2483000,
            "engineCC": 1956
          },
          "Trail Edition AT": {
            "exShowroomPrice": 2552000,
            "engineCC": 1956
          },
          "2.0 Limited Opt FWD AT": {
            "exShowroomPrice": 2690000,
            "engineCC": 1956
          },
          "Trail Edition": {
            "exShowroomPrice": 2366000,
            "engineCC": 1956
          },
          "Track Edition AT": {
            "exShowroomPrice": 2901000,
            "engineCC": 1956
          },
          "2.0 Longitude Opt": {
            "exShowroomPrice": 2570000,
            "engineCC": 1956
          },
          "Track Edition": {
            "exShowroomPrice": 2695000,
            "engineCC": 1956
          },
          "2.0 Sport": {
            "exShowroomPrice": 1799000,
            "engineCC": 1956
          },
          "2.0 Longitude Opt AT": {
            "exShowroomPrice": 2363000,
            "engineCC": 1956
          },
          "85th Anniversary Edition": {
            "exShowroomPrice": 2670000,
            "engineCC": 1956
          },
          "2.0 Model S Opt": {
            "exShowroomPrice": 2670000,
            "engineCC": 1956
          },
          "2.0 Model S Opt 4x4 AT": {
            "exShowroomPrice": 3070000,
            "engineCC": 1956
          },
          "2.0 Model S Opt FWD AT": {
            "exShowroomPrice": 2876000,
            "engineCC": 1956
          }
        }
      }
    },
    "Grand Cherokee": {
      "bodyType": "Car",
      "fuelTypes": {
        "Petrol": [
          "Limited Opt"
        ]
      },
      "basePrice": 6300000,
      "variantPrices": {
        "Petrol": {
          "Limited Opt": {
            "exShowroomPrice": 6300000,
            "engineCC": 1995
          }
        }
      }
    },
    "Meridian": {
      "bodyType": "Car",
      "fuelTypes": {
        "Diesel": [
          "Track Edition AT",
          "Longitude Plus 4x2 AT",
          "Limited Opt 4x4 AT",
          "Limited Opt 4x2",
          "Longitude 4x2",
          "Trail Edition AT",
          "Longitude Plus 4x2",
          "Limited Opt 4x2 AT",
          "Overland 4x2 AT",
          "Trail Edition",
          "Track Edition 4x4 AT",
          "Overland 4x4 AT",
          "Longitude 4x2 AT"
        ]
      },
      "basePrice": 2333000,
      "variantPrices": {
        "Diesel": {
          "Track Edition AT": {
            "exShowroomPrice": 3639000,
            "engineCC": 1956
          },
          "Longitude Plus 4x2 AT": {
            "exShowroomPrice": 2939000,
            "engineCC": 1956
          },
          "Limited Opt 4x4 AT": {
            "exShowroomPrice": 3605000,
            "engineCC": 1956
          },
          "Limited Opt 4x2": {
            "exShowroomPrice": 3045000,
            "engineCC": 1956
          },
          "Longitude 4x2": {
            "exShowroomPrice": 2333000,
            "engineCC": 1956
          },
          "Trail Edition AT": {
            "exShowroomPrice": 3286000,
            "engineCC": 1956
          },
          "Longitude Plus 4x2": {
            "exShowroomPrice": 2630000,
            "engineCC": 1956
          },
          "Limited Opt 4x2 AT": {
            "exShowroomPrice": 3419000,
            "engineCC": 1956
          },
          "Overland 4x2 AT": {
            "exShowroomPrice": 3605000,
            "engineCC": 1956
          },
          "Trail Edition": {
            "exShowroomPrice": 3039000,
            "engineCC": 1956
          },
          "Track Edition 4x4 AT": {
            "exShowroomPrice": 3826000,
            "engineCC": 1956
          },
          "Overland 4x4 AT": {
            "exShowroomPrice": 3792000,
            "engineCC": 1956
          },
          "Longitude 4x2 AT": {
            "exShowroomPrice": 2753000,
            "engineCC": 1956
          }
        }
      }
    },
    "Wrangler": {
      "bodyType": "SUV",
      "fuelTypes": {
        "Petrol": [
          "Unlimited",
          "Willys 41 Special Edition",
          "Rubicon"
        ]
      },
      "basePrice": 6620000,
      "variantPrices": {
        "Petrol": {
          "Unlimited": {
            "exShowroomPrice": 6620000,
            "engineCC": 1995
          },
          "Willys 41 Special Edition": {
            "exShowroomPrice": 7031000,
            "engineCC": 1995
          },
          "Rubicon": {
            "exShowroomPrice": 7080000,
            "engineCC": 1995
          }
        }
      }
    }
  },
  "Kia": {
    "Carens": {
      "bodyType": "MPV",
      "fuelTypes": {
        "CNG": [
          "Premium Opt"
        ],
        "Diesel": [
          "Luxury",
          "Luxury+",
          "Premium",
          "Premium Opt",
          "Prestige",
          "Prestige+"
        ],
        "Petrol": [
          "Luxury",
          "Luxury+",
          "Premium",
          "Premium Opt",
          "Prestige",
          "Prestige+"
        ]
      },
      "basePrice": 1112000,
      "variantPrices": {
        "CNG": {
          "Premium Opt": {
            "exShowroomPrice": 1177000,
            "engineCC": 1497
          }
        },
        "Diesel": {
          "Premium Opt": {
            "exShowroomPrice": 1298000,
            "engineCC": 1493
          }
        },
        "Petrol": {
          "Premium Opt": {
            "exShowroomPrice": 1112000,
            "engineCC": 1497
          }
        }
      }
    },
    "Carens Clavis": {
      "bodyType": "MPV/Crossover",
      "fuelTypes": {
        "Petrol": [
          "GTX Plus Turbo 6Str DCT",
          "GTX Plus Turbo DCT",
          "GTX Turbo 6Str DCT",
          "GTX Turbo DCT",
          "HTE",
          "HTE (O)",
          "HTE (O) Turbo",
          "HTE EX",
          "HTE EX Turbo",
          "HTK",
          "HTK Plus (O) Turbo",
          "HTK Plus (O) Turbo 6Str DCT",
          "HTK Plus (O) Turbo DCT",
          "HTK Plus Turbo",
          "HTK Plus Turbo 6Str DCT",
          "HTK Plus Turbo DCT",
          "HTK+",
          "HTX",
          "HTX (O) A Turbo 6Str DCT",
          "HTX (O) A Turbo DCT",
          "HTX (O) Turbo 6Str DCT",
          "HTX (O) Turbo DCT",
          "HTX Plus Turbo",
          "HTX Plus Turbo 6Str",
          "HTX Plus Turbo DCT",
          "HTX Plus Turbo DCT 6Str",
          "HTX Plus Turbo iMT",
          "HTX Plus Turbo iMT 6Str",
          "HTX Turbo",
          "HTX Turbo iMT",
          "HTX+",
          "HTX+ (O)",
          "X-Line Turbo 6Str DCT",
          "X-Line Turbo DCT"
        ],
        "Diesel": [
          "HTE",
          "HTE (O)",
          "HTE EX",
          "HTK Plus",
          "HTK Plus (O)",
          "HTK Plus 6Str AT",
          "HTK Plus AT",
          "HTK+",
          "HTX",
          "HTX+"
        ]
      },
      "basePrice": 1139000,
      "variantPrices": {
        "Petrol": {
          "HTX Turbo iMT": {
            "exShowroomPrice": 1817000,
            "engineCC": 1482
          },
          "HTX Plus Turbo iMT 6Str": {
            "exShowroomPrice": 1913000,
            "engineCC": 1482
          },
          "HTX (O) Turbo DCT": {
            "exShowroomPrice": 1962000,
            "engineCC": 1482
          },
          "HTE EX": {
            "exShowroomPrice": 1286000,
            "engineCC": 1497
          },
          "HTE (O) Turbo": {
            "exShowroomPrice": 1322000,
            "engineCC": 1482
          },
          "HTX Plus Turbo": {
            "exShowroomPrice": 1869000,
            "engineCC": 1482
          },
          "GTX Plus Turbo 6Str DCT": {
            "exShowroomPrice": 2167000,
            "engineCC": 1482
          },
          "HTK Plus (O) Turbo DCT": {
            "exShowroomPrice": 1786000,
            "engineCC": 1482
          },
          "HTX Plus Turbo 6Str": {
            "exShowroomPrice": 1904000,
            "engineCC": 1482
          },
          "HTK Plus Turbo DCT": {
            "exShowroomPrice": 1685000,
            "engineCC": 1482
          },
          "HTX Plus Turbo DCT": {
            "exShowroomPrice": 2107000,
            "engineCC": 1482
          },
          "HTK Plus (O) Turbo": {
            "exShowroomPrice": 1642000,
            "engineCC": 1482
          },
          "GTX Plus Turbo DCT": {
            "exShowroomPrice": 2179000,
            "engineCC": 1482
          },
          "GTX Turbo DCT": {
            "exShowroomPrice": 2000000,
            "engineCC": 1482
          },
          "HTK Plus (O) Turbo 6Str DCT": {
            "exShowroomPrice": 1774000,
            "engineCC": 1482
          },
          "HTK Plus Turbo 6Str DCT": {
            "exShowroomPrice": 1673000,
            "engineCC": 1482
          },
          "X-Line Turbo 6Str DCT": {
            "exShowroomPrice": 1728000,
            "engineCC": 1482
          },
          "GTX Turbo 6Str DCT": {
            "exShowroomPrice": 1991000,
            "engineCC": 1482
          },
          "HTX (O) A Turbo DCT": {
            "exShowroomPrice": 1988000,
            "engineCC": 1482
          },
          "HTX (O) A Turbo 6Str DCT": {
            "exShowroomPrice": 1988000,
            "engineCC": 1482
          },
          "HTX Plus Turbo DCT 6Str": {
            "exShowroomPrice": 2107000,
            "engineCC": 1482
          },
          "X-Line Turbo DCT": {
            "exShowroomPrice": 2179000,
            "engineCC": 1482
          },
          "HTE": {
            "exShowroomPrice": 1139000,
            "engineCC": 1497
          },
          "HTK Plus Turbo": {
            "exShowroomPrice": 1520000,
            "engineCC": 1482
          },
          "HTX Turbo": {
            "exShowroomPrice": 1796000,
            "engineCC": 1482
          },
          "HTX (O) Turbo 6Str DCT": {
            "exShowroomPrice": 1950000,
            "engineCC": 1482
          },
          "HTX Plus Turbo iMT": {
            "exShowroomPrice": 1933000,
            "engineCC": 1482
          },
          "HTE EX Turbo": {
            "exShowroomPrice": 1377000,
            "engineCC": 1482
          },
          "HTE (O)": {
            "exShowroomPrice": 1235000,
            "engineCC": 1497
          }
        },
        "Diesel": {
          "HTE": {
            "exShowroomPrice": 1314000,
            "engineCC": 1493
          },
          "HTK Plus (O)": {
            "exShowroomPrice": 1722000,
            "engineCC": 1493
          },
          "HTE EX": {
            "exShowroomPrice": 1488000,
            "engineCC": 1493
          },
          "HTX": {
            "exShowroomPrice": 1901000,
            "engineCC": 1493
          },
          "HTK Plus AT": {
            "exShowroomPrice": 1737000,
            "engineCC": 1493
          },
          "HTK Plus": {
            "exShowroomPrice": 1644000,
            "engineCC": 1493
          },
          "HTK Plus 6Str AT": {
            "exShowroomPrice": 1745000,
            "engineCC": 1493
          },
          "HTE (O)": {
            "exShowroomPrice": 1437000,
            "engineCC": 1493
          },
          "HTX+": {
            "exShowroomPrice": 1901000,
            "engineCC": 1493,
            "source": "existing_variant_price_alias"
          }
        }
      }
    },
    "Carens Clavis EV": {
      "bodyType": "MPV/Crossover (Electric)",
      "fuelTypes": {
        "Electric": [
          "GTX ER",
          "GTX ER 6Str",
          "GTX Plus ER",
          "GTX Plus ER 6Str",
          "HTK Plus",
          "HTX",
          "HTX 6Str",
          "HTX E",
          "HTX E 6Str",
          "HTX E ER",
          "HTX E ER 6Str",
          "HTX ER",
          "HTX ER 6Str",
          "HTX Plus ER",
          "HTX Plus ER 6Str",
          "Long range",
          "Standard range",
          "X-Line ER",
          "X-Line ER 6Str"
        ]
      },
      "basePrice": 1804000,
      "variantPrices": {
        "Electric": {
          "HTX ER 6Str": {
            "exShowroomPrice": 2254000
          },
          "HTX E": {
            "exShowroomPrice": 2000000
          },
          "GTX ER 6Str": {
            "exShowroomPrice": 2304000
          },
          "X-Line ER 6Str": {
            "exShowroomPrice": 2500000
          },
          "HTX ER": {
            "exShowroomPrice": 2254000
          },
          "HTX Plus ER": {
            "exShowroomPrice": 2454000
          },
          "GTX Plus ER": {
            "exShowroomPrice": 2500000
          },
          "HTX E 6Str": {
            "exShowroomPrice": 2000000
          },
          "X-Line ER": {
            "exShowroomPrice": 2500000
          },
          "HTK Plus": {
            "exShowroomPrice": 1804000
          },
          "GTX ER": {
            "exShowroomPrice": 2304000
          },
          "HTX E ER 6Str": {
            "exShowroomPrice": 2204000
          },
          "HTX E ER": {
            "exShowroomPrice": 2204000
          },
          "HTX 6Str": {
            "exShowroomPrice": 2054000
          },
          "GTX Plus ER 6Str": {
            "exShowroomPrice": 2500000
          },
          "HTX Plus ER 6Str": {
            "exShowroomPrice": 2454000
          },
          "HTX": {
            "exShowroomPrice": 2054000
          }
        }
      }
    },
    "Carnival": {
      "bodyType": "Premium MPV",
      "fuelTypes": {
        "Diesel": [
          "Limousine",
          "Limousine Plus",
          "Premium",
          "Prestige"
        ]
      },
      "basePrice": 5965000,
      "variantPrices": {
        "Diesel": {
          "Limousine Plus": {
            "exShowroomPrice": 5965000,
            "engineCC": 2151
          }
        }
      }
    },
    "EV6": {
      "bodyType": "Electric SUV (CBU import)",
      "fuelTypes": {
        "Electric": [
          "GT Line",
          "GT Line AWD"
        ]
      },
      "basePrice": 6597000,
      "variantPrices": {
        "Electric": {
          "GT Line": {
            "exShowroomPrice": 6597000
          }
        }
      }
    },
    "EV9": {
      "bodyType": "Full-size Electric SUV (CBU import)",
      "fuelTypes": {
        "Electric": [
          "GT Line",
          "GT Line AWD"
        ]
      },
      "basePrice": 13000000,
      "variantPrices": {
        "Electric": {
          "GT Line": {
            "exShowroomPrice": 1
          }
        }
      }
    },
    "Seltos": {
      "bodyType": "Compact SUV",
      "fuelTypes": {
        "Diesel": [
          "GTX (O) AT",
          "GTX A AT",
          "GTX AT",
          "GTX+",
          "HTE",
          "HTE (O)",
          "HTE (O) AT",
          "HTK",
          "HTK (O)",
          "HTK (O) AT",
          "HTK AT",
          "HTK+",
          "HTX",
          "HTX A",
          "HTX A AT",
          "HTX AT",
          "HTX+",
          "X-Line",
          "X-Line (O) AT",
          "X-Line A AT",
          "X-Line AT"
        ],
        "Petrol": [
          "GTX (O) Turbo DCT",
          "GTX A iVT",
          "GTX A Turbo DCT",
          "GTX iVT",
          "GTX Turbo DCT",
          "GTX+",
          "HTE",
          "HTE (O)",
          "HTE (O) iVT",
          "HTE (O) Turbo iMT",
          "HTK",
          "HTK (O)",
          "HTK (O) iVT",
          "HTK (O) Turbo DCT",
          "HTK (O) Turbo iMT",
          "HTK iVT",
          "HTK Turbo iMT",
          "HTK+",
          "HTX",
          "HTX A",
          "HTX A iVT",
          "HTX A Turbo DCT",
          "HTX iVT",
          "HTX Turbo DCT",
          "HTX+",
          "HTX+ (O)",
          "X-Line",
          "X-Line (O) Turbo DCT",
          "X-Line A iVT",
          "X-Line A Turbo DCT",
          "X-Line iVT",
          "X-Line Turbo DCT"
        ]
      },
      "basePrice": 1100000,
      "variantPrices": {
        "Diesel": {
          "HTX A": {
            "exShowroomPrice": 1864000,
            "engineCC": 1493
          },
          "GTX AT": {
            "exShowroomPrice": 2000000,
            "engineCC": 1493
          },
          "HTE (O) AT": {
            "exShowroomPrice": 1532000,
            "engineCC": 1493
          },
          "HTX A AT": {
            "exShowroomPrice": 1994000,
            "engineCC": 1493
          },
          "HTX": {
            "exShowroomPrice": 1754000,
            "engineCC": 1493
          },
          "HTE (O)": {
            "exShowroomPrice": 1404000,
            "engineCC": 1493
          },
          "HTX AT": {
            "exShowroomPrice": 1884000,
            "engineCC": 1493
          },
          "HTK (O)": {
            "exShowroomPrice": 1614000,
            "engineCC": 1493
          },
          "GTX A AT": {
            "exShowroomPrice": 2032000,
            "engineCC": 1493
          },
          "HTK AT": {
            "exShowroomPrice": 1634000,
            "engineCC": 1493
          },
          "X-Line A AT": {
            "exShowroomPrice": 2032000,
            "engineCC": 1493
          },
          "HTK": {
            "exShowroomPrice": 1504000,
            "engineCC": 1493
          },
          "GTX (O) AT": {
            "exShowroomPrice": 2182000,
            "engineCC": 1493
          },
          "HTK (O) AT": {
            "exShowroomPrice": 1744000,
            "engineCC": 1493
          },
          "HTE": {
            "exShowroomPrice": 1294000,
            "engineCC": 1493
          },
          "X-Line (O) AT": {
            "exShowroomPrice": 2182000,
            "engineCC": 1493
          },
          "X-Line AT": {
            "exShowroomPrice": 2000000,
            "engineCC": 1493
          },
          "HTK+": {
            "exShowroomPrice": 1504000,
            "engineCC": 1493,
            "source": "existing_variant_price_alias"
          },
          "HTX+": {
            "exShowroomPrice": 1754000,
            "engineCC": 1493,
            "source": "existing_variant_price_alias"
          }
        },
        "Petrol": {
          "GTX A Turbo DCT": {
            "exShowroomPrice": 2000000,
            "engineCC": 1482
          },
          "HTK (O) Turbo iMT": {
            "exShowroomPrice": 1530000,
            "engineCC": 1482
          },
          "HTK iVT": {
            "exShowroomPrice": 1472000,
            "engineCC": 1497
          },
          "HTE": {
            "exShowroomPrice": 1100000,
            "engineCC": 1497
          },
          "HTX Turbo DCT": {
            "exShowroomPrice": 1802000,
            "engineCC": 1482
          },
          "GTX (O) Turbo DCT": {
            "exShowroomPrice": 2157000,
            "engineCC": 1482
          },
          "HTE (O) iVT": {
            "exShowroomPrice": 1372000,
            "engineCC": 1497
          },
          "HTX iVT": {
            "exShowroomPrice": 1722000,
            "engineCC": 1497
          },
          "HTK (O) Turbo DCT": {
            "exShowroomPrice": 1662000,
            "engineCC": 1482
          },
          "HTK (O) iVT": {
            "exShowroomPrice": 1582000,
            "engineCC": 1497
          },
          "X-Line Turbo DCT": {
            "exShowroomPrice": 1952000,
            "engineCC": 1482
          },
          "HTK (O)": {
            "exShowroomPrice": 1452000,
            "engineCC": 1497
          },
          "HTX A": {
            "exShowroomPrice": 1702000,
            "engineCC": 1497
          },
          "HTX A iVT": {
            "exShowroomPrice": 1832000,
            "engineCC": 1497
          },
          "HTE (O)": {
            "exShowroomPrice": 1242000,
            "engineCC": 1497
          },
          "X-Line iVT": {
            "exShowroomPrice": 1872000,
            "engineCC": 1497
          },
          "X-Line A Turbo DCT": {
            "exShowroomPrice": 2000000,
            "engineCC": 1482
          },
          "GTX iVT": {
            "exShowroomPrice": 1872000,
            "engineCC": 1497
          },
          "HTX": {
            "exShowroomPrice": 1592000,
            "engineCC": 1497
          },
          "HTE (O) Turbo iMT": {
            "exShowroomPrice": 1322000,
            "engineCC": 1482
          },
          "HTX A Turbo DCT": {
            "exShowroomPrice": 1912000,
            "engineCC": 1482
          },
          "X-Line (O) Turbo DCT": {
            "exShowroomPrice": 2157000,
            "engineCC": 1482
          },
          "X-Line A iVT": {
            "exShowroomPrice": 1982000,
            "engineCC": 1497
          },
          "GTX Turbo DCT": {
            "exShowroomPrice": 1952000,
            "engineCC": 1482
          },
          "HTK": {
            "exShowroomPrice": 1342000,
            "engineCC": 1497
          },
          "HTK Turbo iMT": {
            "exShowroomPrice": 1422000,
            "engineCC": 1482
          },
          "GTX A iVT": {
            "exShowroomPrice": 1982000,
            "engineCC": 1497
          },
          "HTK+": {
            "exShowroomPrice": 1342000,
            "engineCC": 1497,
            "source": "existing_variant_price_alias"
          },
          "HTX+": {
            "exShowroomPrice": 1592000,
            "engineCC": 1497,
            "source": "existing_variant_price_alias"
          }
        }
      }
    },
    "Sonet": {
      "bodyType": "Compact SUV (sub-4m)",
      "fuelTypes": {
        "Diesel": [
          "GTX Plus AT",
          "HTE",
          "HTE (O)",
          "HTE (O) AT",
          "HTK",
          "HTK (O)",
          "HTK (O) AT",
          "HTK Plus",
          "HTK Plus (O)",
          "HTK Plus (O) AT",
          "HTK Plus AT",
          "HTK+",
          "HTX",
          "HTX AT",
          "HTX+",
          "X-Line"
        ],
        "Petrol": [
          "GTX Plus Turbo DCT",
          "GTX+",
          "HTE",
          "HTE (O)",
          "HTK",
          "HTK (O)",
          "HTK (O) Turbo DCT",
          "HTK (O) Turbo iMT",
          "HTK Plus",
          "HTK Plus (O)",
          "HTK Plus (O) Turbo DCT",
          "HTK Plus (O) Turbo iMT",
          "HTK+",
          "HTX",
          "HTX Turbo DCT",
          "HTX+",
          "X-Line",
          "X-line Turbo DCT"
        ]
      },
      "basePrice": 741000,
      "variantPrices": {
        "Diesel": {
          "GTX Plus AT": {
            "exShowroomPrice": 1409000,
            "engineCC": 1493
          },
          "HTK Plus (O) AT": {
            "exShowroomPrice": 1168000,
            "engineCC": 1493
          },
          "HTK Plus AT": {
            "exShowroomPrice": 1136000,
            "engineCC": 1493
          },
          "HTE (O) AT": {
            "exShowroomPrice": 1000000,
            "engineCC": 1493
          },
          "HTX": {
            "exShowroomPrice": 1133000,
            "engineCC": 1493
          },
          "HTX AT": {
            "exShowroomPrice": 1230000,
            "engineCC": 1493
          },
          "HTE (O)": {
            "exShowroomPrice": 920000,
            "engineCC": 1493
          },
          "HTK Plus (O)": {
            "exShowroomPrice": 1088000,
            "engineCC": 1493
          },
          "HTK (O)": {
            "exShowroomPrice": 1000000,
            "engineCC": 1493
          },
          "HTK (O) AT": {
            "exShowroomPrice": 1100000,
            "engineCC": 1493
          },
          "HTK Plus": {
            "exShowroomPrice": 1056000,
            "engineCC": 1493
          },
          "HTX+": {
            "exShowroomPrice": 1133000,
            "engineCC": 1493,
            "source": "existing_variant_price_alias"
          }
        },
        "Petrol": {
          "HTK Plus (O)": {
            "exShowroomPrice": 972000,
            "engineCC": 1197
          },
          "HTK (O) Turbo DCT": {
            "exShowroomPrice": 1000000,
            "engineCC": 998
          },
          "HTK Plus (O) Turbo iMT": {
            "exShowroomPrice": 1012000,
            "engineCC": 998
          },
          "GTX Plus Turbo DCT": {
            "exShowroomPrice": 1366000,
            "engineCC": 998
          },
          "HTK Plus (O) Turbo DCT": {
            "exShowroomPrice": 1100000,
            "engineCC": 998
          },
          "HTE (O)": {
            "exShowroomPrice": 784000,
            "engineCC": 1197
          },
          "HTK (O) Turbo iMT": {
            "exShowroomPrice": 917000,
            "engineCC": 998
          },
          "HTX Turbo DCT": {
            "exShowroomPrice": 1167000,
            "engineCC": 998
          },
          "HTK Plus": {
            "exShowroomPrice": 924000,
            "engineCC": 1197
          },
          "X-line Turbo DCT": {
            "exShowroomPrice": 1380000,
            "engineCC": 998
          },
          "HTE": {
            "exShowroomPrice": 741000,
            "engineCC": 1197
          },
          "HTK (O)": {
            "exShowroomPrice": 885000,
            "engineCC": 1197
          }
        }
      }
    },
    "Syros": {
      "bodyType": "Compact SUV",
      "fuelTypes": {
        "Petrol": [
          "HTE",
          "HTE Opt Turbo",
          "HTE Turbo",
          "HTK",
          "HTK EX Turbo",
          "HTK Plus Opt Turbo",
          "HTK Plus Opt Turbo DCT",
          "HTK Plus Turbo",
          "HTK Plus Turbo DCT",
          "HTK+",
          "HTX",
          "HTX Opt Turbo DCT",
          "HTX Turbo DCT",
          "HTX+",
          "X-Line"
        ],
        "Diesel": [
          "HTE Opt",
          "HTK EX",
          "HTK Plus",
          "HTK Plus AT",
          "HTK Plus Opt",
          "HTK Plus Opt AT",
          "HTK+",
          "HTX",
          "HTX AT",
          "HTX Opt AT",
          "HTX+"
        ]
      },
      "basePrice": 842000,
      "variantPrices": {
        "Petrol": {
          "HTK EX Turbo": {
            "exShowroomPrice": 982000,
            "engineCC": 998
          },
          "HTK Plus Turbo": {
            "exShowroomPrice": 1076000,
            "engineCC": 998
          },
          "HTK Plus Opt Turbo DCT": {
            "exShowroomPrice": 1322000,
            "engineCC": 998
          },
          "HTE Opt Turbo": {
            "exShowroomPrice": 922000,
            "engineCC": 998
          },
          "HTE Turbo": {
            "exShowroomPrice": 842000,
            "engineCC": 998
          },
          "HTK Plus Turbo DCT": {
            "exShowroomPrice": 1196000,
            "engineCC": 998
          },
          "HTK Plus Opt Turbo": {
            "exShowroomPrice": 1202000,
            "engineCC": 998
          },
          "HTX Turbo DCT": {
            "exShowroomPrice": 1402000,
            "engineCC": 998
          },
          "HTX Opt Turbo DCT": {
            "exShowroomPrice": 1500000,
            "engineCC": 998
          }
        },
        "Diesel": {
          "HTX Opt AT": {
            "exShowroomPrice": 1582000,
            "engineCC": 1493
          },
          "HTK Plus": {
            "exShowroomPrice": 1156000,
            "engineCC": 1493
          },
          "HTX AT": {
            "exShowroomPrice": 1482000,
            "engineCC": 1493
          },
          "HTK EX": {
            "exShowroomPrice": 1062000,
            "engineCC": 1493
          },
          "HTE Opt": {
            "exShowroomPrice": 1000000,
            "engineCC": 1493
          },
          "HTK Plus AT": {
            "exShowroomPrice": 1276000,
            "engineCC": 1493
          },
          "HTK Plus Opt": {
            "exShowroomPrice": 1282000,
            "engineCC": 1493
          },
          "HTK Plus Opt AT": {
            "exShowroomPrice": 1402000,
            "engineCC": 1493
          }
        }
      }
    },
    "Syros EV": {
      "bodyType": "Electric",
      "fuelTypes": {
        "Electric": [
          "HTK Plus",
          "HTX ER",
          "HTK Plus ER",
          "HTX Plus ER",
          "HTK",
          "X-Line ER",
          "HTX"
        ]
      },
      "basePrice": 1350000,
      "variantPrices": {
        "Electric": {
          "HTK Plus": {
            "exShowroomPrice": 1500000
          },
          "HTX ER": {
            "exShowroomPrice": 1800000
          },
          "HTK Plus ER": {
            "exShowroomPrice": 1700000
          },
          "HTX Plus ER": {
            "exShowroomPrice": 1950000
          },
          "HTK": {
            "exShowroomPrice": 1350000
          },
          "X-Line ER": {
            "exShowroomPrice": 2000000
          },
          "HTX": {
            "exShowroomPrice": 1600000
          }
        }
      }
    }
  },
  "Lamborghini": {
    "Huracan EVO": {
      "bodyType": "Electric",
      "fuelTypes": {
        "Petrol": [
          "Tecnica",
          "Spyder",
          "STO",
          "Sterrato"
        ]
      },
      "basePrice": 40000000,
      "variantPrices": {
        "Petrol": {
          "Tecnica": {
            "exShowroomPrice": 4,
            "engineCC": 5204
          },
          "Spyder": {
            "exShowroomPrice": 4,
            "engineCC": 5204
          },
          "STO": {
            "exShowroomPrice": 5,
            "engineCC": 5204
          },
          "Sterrato": {
            "exShowroomPrice": 5,
            "engineCC": 5204
          }
        }
      }
    },
    "Urus": {
      "bodyType": "SUV",
      "fuelTypes": {
        "Petrol": [
          "SE Plugin Hybrid",
          "S",
          "Performante"
        ]
      },
      "basePrice": 41800000,
      "variantPrices": {
        "Petrol": {
          "SE Plugin Hybrid": {
            "exShowroomPrice": 5,
            "engineCC": 3999
          },
          "S": {
            "exShowroomPrice": 4,
            "engineCC": 3999
          },
          "Performante": {
            "exShowroomPrice": 4,
            "engineCC": 3996
          }
        }
      }
    }
  },
  "Land Rover": {
    "Discovery": {
      "bodyType": "SUV",
      "fuelTypes": {
        "Diesel": [
          "3.0 S",
          "3.0 Metropolitan Edition",
          "3.0 Dynamic HSE"
        ]
      },
      "basePrice": 12500000,
      "variantPrices": {
        "Diesel": {
          "3.0 S": {
            "exShowroomPrice": 1,
            "engineCC": 2996
          },
          "3.0 Metropolitan Edition": {
            "exShowroomPrice": 1,
            "engineCC": 2997
          },
          "3.0 Dynamic HSE": {
            "exShowroomPrice": 1,
            "engineCC": 2996
          }
        }
      }
    },
    "Discovery Sport": {
      "bodyType": "SUV",
      "fuelTypes": {
        "Diesel": [
          "Dynamic SE"
        ],
        "Petrol": [
          "Dynamic SE"
        ]
      },
      "basePrice": 6337000,
      "variantPrices": {
        "Diesel": {
          "Dynamic SE": {
            "exShowroomPrice": 6337000,
            "engineCC": 1999
          }
        },
        "Petrol": {
          "Dynamic SE": {
            "exShowroomPrice": 6337000,
            "engineCC": 1997
          }
        }
      }
    }
  },
  "Land-Rover": {
    "Defender": {
      "bodyType": "SUV",
      "fuelTypes": {
        "Petrol": [
          "5.0 l V8 130",
          "5.0 l V8 110 X",
          "4.4 l V8 110 OCTA Edition One",
          "5.0 l V8 90",
          "2.0 l 110 X-Dynamic HSE",
          "5.0 l V8 130 X",
          "5.0 l V8 90 X",
          "5.0 l V8 130 X-Dynamic HSE",
          "5.0 l V8 110 X-Dynamic HSE",
          "4.4 l V8 110 OCTA"
        ],
        "Diesel": [
          "3.0 l 130 X",
          "3.0 l 110 X",
          "3.0 l 110 X-Dynamic HSE",
          "3.0 l 130 X-Dynamic HSE"
        ]
      },
      "basePrice": 10700000,
      "variantPrices": {
        "Petrol": {
          "5.0 l V8 130": {
            "exShowroomPrice": 2,
            "engineCC": 5000
          },
          "5.0 l V8 110 X": {
            "exShowroomPrice": 2,
            "engineCC": 5000
          },
          "4.4 l V8 110 OCTA Edition One": {
            "exShowroomPrice": 3,
            "engineCC": 4395
          },
          "5.0 l V8 90": {
            "exShowroomPrice": 2,
            "engineCC": 5000
          },
          "2.0 l 110 X-Dynamic HSE": {
            "exShowroomPrice": 1,
            "engineCC": 1997
          },
          "5.0 l V8 130 X": {
            "exShowroomPrice": 2,
            "engineCC": 5000
          },
          "5.0 l V8 90 X": {
            "exShowroomPrice": 1,
            "engineCC": 5000
          },
          "5.0 l V8 130 X-Dynamic HSE": {
            "exShowroomPrice": 2,
            "engineCC": 5000
          },
          "5.0 l V8 110 X-Dynamic HSE": {
            "exShowroomPrice": 1,
            "engineCC": 5000
          },
          "4.4 l V8 110 OCTA": {
            "exShowroomPrice": 2,
            "engineCC": 4395
          }
        },
        "Diesel": {
          "3.0 l 130 X": {
            "exShowroomPrice": 2,
            "engineCC": 2997
          },
          "3.0 l 110 X": {
            "exShowroomPrice": 1,
            "engineCC": 2997
          },
          "3.0 l 110 X-Dynamic HSE": {
            "exShowroomPrice": 1,
            "engineCC": 2997
          },
          "3.0 l 130 X-Dynamic HSE": {
            "exShowroomPrice": 1,
            "engineCC": 2997
          }
        }
      }
    },
    "Range Rover": {
      "bodyType": "SUV",
      "fuelTypes": {
        "Petrol": [
          "4.4 l LWB SV",
          "3.0 I LWB Autobiography"
        ],
        "Diesel": [
          "3.0 I LWB HSE",
          "3.0 l LWB SV"
        ]
      },
      "basePrice": 24000000,
      "variantPrices": {
        "Petrol": {
          "4.4 l LWB SV": {
            "exShowroomPrice": 4,
            "engineCC": 4395
          },
          "3.0 I LWB Autobiography": {
            "exShowroomPrice": 3,
            "engineCC": 2996
          }
        },
        "Diesel": {
          "3.0 I LWB HSE": {
            "exShowroomPrice": 2,
            "engineCC": 2997
          },
          "3.0 l LWB SV": {
            "exShowroomPrice": 4,
            "engineCC": 2996
          }
        }
      }
    },
    "Range Rover Evoque": {
      "bodyType": "SUV",
      "fuelTypes": {
        "Petrol": [
          "Autobiography"
        ],
        "Diesel": [
          "Autobiography"
        ]
      },
      "basePrice": 6486000,
      "variantPrices": {
        "Petrol": {
          "Autobiography": {
            "exShowroomPrice": 6486000,
            "engineCC": 1997
          }
        },
        "Diesel": {
          "Autobiography": {
            "exShowroomPrice": 6486000,
            "engineCC": 1997
          }
        }
      }
    },
    "Range Rover Sport": {
      "bodyType": "SUV",
      "fuelTypes": {
        "Petrol": [
          "4.4 l SV Carbon",
          "3.0 l Dynamic HSE",
          "4.4 l SV Black",
          "3.0l Autobiography",
          "3.0 l PHEV Autobiography",
          "4.4 l SV"
        ],
        "Diesel": [
          "3.0 l Dynamic HSE",
          "3.0l Autobiography"
        ]
      },
      "basePrice": 14300000,
      "variantPrices": {
        "Petrol": {
          "4.4 l SV Carbon": {
            "exShowroomPrice": 2,
            "engineCC": 4395
          },
          "3.0 l Dynamic HSE": {
            "exShowroomPrice": 1,
            "engineCC": 2998
          },
          "4.4 l SV Black": {
            "exShowroomPrice": 2,
            "engineCC": 4395
          },
          "3.0l Autobiography": {
            "exShowroomPrice": 2,
            "engineCC": 2998
          },
          "3.0 l PHEV Autobiography": {
            "exShowroomPrice": 2,
            "engineCC": 2998
          },
          "4.4 l SV": {
            "exShowroomPrice": 2,
            "engineCC": 4395
          }
        },
        "Diesel": {
          "3.0 l Dynamic HSE": {
            "exShowroomPrice": 1,
            "engineCC": 2998
          },
          "3.0l Autobiography": {
            "exShowroomPrice": 2,
            "engineCC": 2997
          }
        }
      }
    },
    "Range Rover Velar": {
      "bodyType": "SUV",
      "fuelTypes": {
        "Petrol": [
          "2.0 l Autobiography"
        ],
        "Diesel": [
          "2.0 l Autobiography"
        ]
      },
      "basePrice": 8750000,
      "variantPrices": {
        "Petrol": {
          "2.0 l Autobiography": {
            "exShowroomPrice": 8750000,
            "engineCC": 1997
          }
        },
        "Diesel": {
          "2.0 l Autobiography": {
            "exShowroomPrice": 8750000,
            "engineCC": 1997
          }
        }
      }
    }
  },
  "Lexus": {
    "ES 350h": {
      "bodyType": "Car",
      "fuelTypes": {
        "Petrol": [
          "Luxury",
          "Exquisite"
        ]
      },
      "basePrice": 6610000,
      "variantPrices": {
        "Petrol": {
          "Luxury": {
            "exShowroomPrice": 7180000,
            "engineCC": 2487
          },
          "Exquisite": {
            "exShowroomPrice": 6610000,
            "engineCC": 2487
          }
        }
      }
    },
    "ES Electric": {
      "bodyType": "Electric",
      "fuelTypes": {
        "Electric": [
          "ES 500e"
        ]
      },
      "basePrice": 9120000,
      "variantPrices": {
        "Electric": {
          "ES 500e": {
            "exShowroomPrice": 9120000
          }
        }
      }
    },
    "LM": {
      "bodyType": "Car",
      "fuelTypes": {
        "Petrol": [
          "350h 7 Seater VIP",
          "350h 4 Seater Ultra Luxury"
        ]
      },
      "basePrice": 22000000,
      "variantPrices": {
        "Petrol": {
          "350h 7 Seater VIP": {
            "exShowroomPrice": 2,
            "engineCC": 2487
          },
          "350h 4 Seater Ultra Luxury": {
            "exShowroomPrice": 3,
            "engineCC": 2487
          }
        }
      }
    },
    "LX": {
      "bodyType": "SUV",
      "fuelTypes": {
        "Diesel": [
          "500d",
          "500d Overtrail"
        ]
      },
      "basePrice": 28100000,
      "variantPrices": {
        "Diesel": {
          "500d": {
            "exShowroomPrice": 3,
            "engineCC": 3346
          },
          "500d Overtrail": {
            "exShowroomPrice": 3,
            "engineCC": 3346
          }
        }
      }
    },
    "NX": {
      "bodyType": "SUV",
      "fuelTypes": {
        "Petrol": [
          "350h F-sport",
          "350h Luxury",
          "350h Exquisite",
          "350h Overtrail"
        ]
      },
      "basePrice": 6759000,
      "variantPrices": {
        "Petrol": {
          "350h F-sport": {
            "exShowroomPrice": 7450000,
            "engineCC": 2487
          },
          "350h Luxury": {
            "exShowroomPrice": 7233000,
            "engineCC": 2487
          },
          "350h Exquisite": {
            "exShowroomPrice": 6759000,
            "engineCC": 2487
          },
          "350h Overtrail": {
            "exShowroomPrice": 7143000,
            "engineCC": 2487
          }
        }
      }
    },
    "RX": {
      "bodyType": "SUV",
      "fuelTypes": {
        "Petrol": [
          "350h Luxury Lexus Premium System",
          "500h F SPORT Lexus Premium System"
        ]
      },
      "basePrice": 8999000,
      "variantPrices": {
        "Petrol": {
          "350h Luxury Lexus Premium System": {
            "exShowroomPrice": 8999000,
            "engineCC": 2487
          },
          "500h F SPORT Lexus Premium System": {
            "exShowroomPrice": 1,
            "engineCC": 2393
          }
        }
      }
    }
  },
  "Lotus": {
    "Eletre": {
      "bodyType": "Car",
      "fuelTypes": {
        "Electric": [
          "S",
          "R",
          "Base"
        ]
      },
      "basePrice": 25500000,
      "variantPrices": {
        "Electric": {
          "S": {
            "exShowroomPrice": 3
          },
          "R": {
            "exShowroomPrice": 3
          },
          "Base": {
            "exShowroomPrice": 3
          }
        }
      }
    },
    "Emeya": {
      "bodyType": "Car",
      "fuelTypes": {
        "Electric": [
          "GT"
        ]
      },
      "basePrice": 23400000,
      "variantPrices": {
        "Electric": {
          "GT": {
            "exShowroomPrice": 2
          }
        }
      }
    },
    "Emira": {
      "bodyType": "Car",
      "fuelTypes": {
        "Petrol": [
          "Turbo SE"
        ]
      },
      "basePrice": 32200000,
      "variantPrices": {
        "Petrol": {
          "Turbo SE": {
            "exShowroomPrice": 3,
            "engineCC": 1998
          }
        }
      }
    }
  },
  "MG": {
    "Astor": {
      "bodyType": "Compact SUV",
      "fuelTypes": {
        "Petrol": [
          "Savvy",
          "Savvy Pro CVT",
          "Savvy Pro Sangria CVT",
          "Select",
          "Select CVT",
          "Sharp",
          "Sharp Pro",
          "Sharp Pro CVT",
          "Shine",
          "Smart",
          "Sprint",
          "Style",
          "Super"
        ]
      },
      "basePrice": 979000,
      "variantPrices": {
        "Petrol": {
          "Shine": {
            "exShowroomPrice": 1134000,
            "engineCC": 1498
          },
          "Select CVT": {
            "exShowroomPrice": 1356000,
            "engineCC": 1498
          },
          "Select": {
            "exShowroomPrice": 1240000,
            "engineCC": 1498
          },
          "Savvy Pro CVT": {
            "exShowroomPrice": 1530000,
            "engineCC": 1498
          },
          "Sharp Pro": {
            "exShowroomPrice": 1337000,
            "engineCC": 1498
          },
          "Sharp Pro CVT": {
            "exShowroomPrice": 1452000,
            "engineCC": 1498
          },
          "Sprint": {
            "exShowroomPrice": 979000,
            "engineCC": 1498
          },
          "Savvy Pro Sangria CVT": {
            "exShowroomPrice": 1530000,
            "engineCC": 1498
          }
        }
      }
    },
    "Comet EV": {
      "bodyType": "Hatchback",
      "fuelTypes": {
        "Electric": [
          "Blackstorm Edition",
          "Excite",
          "Excite FC",
          "Exclusive",
          "Exclusive FC",
          "Executive",
          "Pace",
          "Play",
          "Plush"
        ]
      },
      "basePrice": 780000,
      "variantPrices": {
        "Electric": {
          "Blackstorm Edition": {
            "exShowroomPrice": 1000000
          },
          "Excite": {
            "exShowroomPrice": 890000
          },
          "Excite FC": {
            "exShowroomPrice": 917000
          },
          "Exclusive FC": {
            "exShowroomPrice": 1007000
          },
          "Executive": {
            "exShowroomPrice": 780000
          },
          "Exclusive": {
            "exShowroomPrice": 980000
          }
        }
      }
    },
    "Cyberster": {
      "bodyType": "Electric Roadster (CBU import)",
      "fuelTypes": {
        "Electric": [
          "Couture Edition",
          "GT",
          "Trophy"
        ]
      },
      "basePrice": 8250000,
      "variantPrices": {
        "Electric": {
          "Couture Edition": {
            "exShowroomPrice": 8749000
          },
          "GT": {
            "exShowroomPrice": 8250000
          }
        }
      }
    },
    "Hector": {
      "bodyType": "Midsize SUV",
      "fuelTypes": {
        "Petrol": [
          "Blackstorm",
          "Savvy Pro CVT",
          "Select",
          "Select Pro",
          "Sharp",
          "Sharp Pro",
          "Sharp Pro CVT",
          "Shine (SE)",
          "Smart",
          "Smart Pro",
          "Smart Pro CVT",
          "Style",
          "Super"
        ],
        "Diesel": [
          "Select",
          "Sharp",
          "Smart",
          "Style",
          "Super"
        ],
        "Petrol Hybrid": [
          "Hybrid (mild-hybrid petrol)"
        ]
      },
      "basePrice": 1199000,
      "variantPrices": {
        "Petrol": {
          "Sharp Pro CVT": {
            "exShowroomPrice": 1829000,
            "engineCC": 1451
          },
          "Style": {
            "exShowroomPrice": 1199000,
            "engineCC": 1451
          },
          "Smart Pro": {
            "exShowroomPrice": 1529000,
            "engineCC": 1451
          },
          "Smart Pro CVT": {
            "exShowroomPrice": 1659000,
            "engineCC": 1451
          },
          "Savvy Pro CVT": {
            "exShowroomPrice": 1919000,
            "engineCC": 1451
          },
          "Select Pro": {
            "exShowroomPrice": 1429000,
            "engineCC": 1451
          },
          "Sharp Pro": {
            "exShowroomPrice": 1699000,
            "engineCC": 1451
          }
        },
        "Diesel": {},
        "Petrol Hybrid": {}
      }
    },
    "Hector Plus": {
      "bodyType": "Midsize SUV (6/7-seat)",
      "fuelTypes": {
        "Petrol": [
          "Savvy Pro CVT",
          "Select",
          "Sharp",
          "Sharp Pro",
          "Sharp Pro CVT",
          "Shine (SE)",
          "Smart",
          "Style",
          "Super"
        ],
        "Diesel": [
          "Select",
          "Sharp",
          "Smart",
          "Style",
          "Super"
        ]
      },
      "basePrice": 1749000,
      "variantPrices": {
        "Petrol": {
          "Sharp Pro CVT": {
            "exShowroomPrice": 1879000,
            "engineCC": 1451
          },
          "Savvy Pro CVT": {
            "exShowroomPrice": 1969000,
            "engineCC": 1451
          },
          "Sharp Pro": {
            "exShowroomPrice": 1749000,
            "engineCC": 1451
          }
        },
        "Diesel": {}
      }
    },
    "Hector Tomahawk EV": {
      "bodyType": "SUV",
      "fuelTypes": {
        "Electric": [
          "Essence 5-Seater",
          "Essence 7-Seater",
          "Exclusive 7-Seater",
          "Excite 7-Seater"
        ]
      },
      "basePrice": 1950000,
      "variantPrices": {
        "Electric": {
          "Essence 5-Seater": {
            "exShowroomPrice": 2300000
          },
          "Essence 7-Seater": {
            "exShowroomPrice": 2350000
          },
          "Exclusive 7-Seater": {
            "exShowroomPrice": 2200000
          },
          "Excite 7-Seater": {
            "exShowroomPrice": 1950000
          }
        }
      }
    },
    "Hector Tomahawk PHEV": {
      "bodyType": "SUV",
      "fuelTypes": {
        "Petrol": [
          "Exclusive 7-Seater",
          "Essence 7-Seater"
        ]
      },
      "basePrice": 2570000,
      "variantPrices": {
        "Petrol": {
          "Exclusive 7-Seater": {
            "exShowroomPrice": 2570000,
            "engineCC": 1498
          },
          "Essence 7-Seater": {
            "exShowroomPrice": 2780000,
            "engineCC": 1498
          }
        }
      }
    },
    "M9": {
      "bodyType": "MPV",
      "fuelTypes": {
        "Electric": [
          "Couture Edition",
          "Presidential Limo",
          "Standard"
        ]
      },
      "basePrice": 7995000,
      "variantPrices": {
        "Electric": {
          "Presidential Limo": {
            "exShowroomPrice": 7995000
          },
          "Couture Edition": {
            "exShowroomPrice": 8494000
          }
        }
      }
    },
    "Majestor": {
      "bodyType": "Car",
      "fuelTypes": {
        "Diesel": [
          "Savvy 4x4",
          "Savvy 4x2 6STR",
          "Savvy 4x2"
        ]
      },
      "basePrice": 4249000,
      "variantPrices": {
        "Diesel": {
          "Savvy 4x4": {
            "exShowroomPrice": 4499000,
            "engineCC": 1996
          },
          "Savvy 4x2 6STR": {
            "exShowroomPrice": 4249000,
            "engineCC": 1996
          },
          "Savvy 4x2": {
            "exShowroomPrice": 4249000,
            "engineCC": 1996
          }
        }
      }
    },
    "Windsor EV": {
      "bodyType": "Crossover (Electric)",
      "fuelTypes": {
        "Electric": [
          "Essence",
          "Essence Pro",
          "Excite",
          "Exclusive",
          "Exclusive Pro",
          "Pro (larger battery)"
        ]
      },
      "basePrice": 1470000,
      "variantPrices": {
        "Electric": {
          "Exclusive Pro": {
            "exShowroomPrice": 1790000
          },
          "Excite": {
            "exShowroomPrice": 1470000
          },
          "Exclusive": {
            "exShowroomPrice": 1600000
          },
          "Essence Pro": {
            "exShowroomPrice": 1900000
          },
          "Essence": {
            "exShowroomPrice": 1700000
          }
        }
      }
    },
    "ZS EV": {
      "bodyType": "SUV",
      "fuelTypes": {
        "Electric": [
          "100 Year Limited Edition",
          "Essence",
          "Essence DT",
          "Excite",
          "Excite Pro",
          "Exclusive",
          "Exclusive Plus",
          "Exclusive Plus DT",
          "Executive"
        ]
      },
      "basePrice": 1799000,
      "variantPrices": {
        "Electric": {
          "Exclusive Plus": {
            "exShowroomPrice": 1975000
          },
          "100 Year Limited Edition": {
            "exShowroomPrice": 1975000
          },
          "Exclusive Plus DT": {
            "exShowroomPrice": 1975000
          },
          "Excite Pro": {
            "exShowroomPrice": 1875000
          },
          "Essence": {
            "exShowroomPrice": 2075000
          },
          "Executive": {
            "exShowroomPrice": 1799000
          },
          "Essence DT": {
            "exShowroomPrice": 2075000
          }
        }
      }
    }
  },
  "MINI": {
    "Cooper Convertible": {
      "bodyType": "Coupe/Convertible",
      "fuelTypes": {
        "Petrol": [
          "JCW Pack",
          "Stardust Edition",
          "S"
        ]
      },
      "basePrice": 5900000,
      "variantPrices": {
        "Petrol": {
          "JCW Pack": {
            "exShowroomPrice": 6150000,
            "engineCC": 1998
          },
          "Stardust Edition": {
            "exShowroomPrice": 6290000,
            "engineCC": 1998
          },
          "S": {
            "exShowroomPrice": 5900000,
            "engineCC": 1998
          }
        }
      }
    },
    "Cooper S": {
      "bodyType": "Car",
      "fuelTypes": {
        "Petrol": [
          "STD",
          "Classic Pack",
          "JCW Pack",
          "GP Inspired Edition",
          "Victory Edition",
          "Favoured Pack"
        ]
      },
      "basePrice": 4445000,
      "variantPrices": {
        "Petrol": {
          "STD": {
            "exShowroomPrice": 4445000,
            "engineCC": 1998
          },
          "Classic Pack": {
            "exShowroomPrice": 5040000,
            "engineCC": 1998
          },
          "JCW Pack": {
            "exShowroomPrice": 5515000,
            "engineCC": 1998
          },
          "GP Inspired Edition": {
            "exShowroomPrice": 5890000,
            "engineCC": 1998
          },
          "Victory Edition": {
            "exShowroomPrice": 5750000,
            "engineCC": 1998
          },
          "Favoured Pack": {
            "exShowroomPrice": 5325000,
            "engineCC": 1998
          }
        }
      }
    },
    "Countryman": {
      "bodyType": "Car",
      "fuelTypes": {
        "Petrol": [
          "JCW"
        ]
      },
      "basePrice": 6615000,
      "variantPrices": {
        "Petrol": {
          "JCW": {
            "exShowroomPrice": 6615000,
            "engineCC": 1998
          }
        }
      }
    },
    "Countryman C": {
      "bodyType": "Car",
      "fuelTypes": {
        "Electric": [
          "Std"
        ]
      },
      "basePrice": 4750000,
      "variantPrices": {
        "Electric": {
          "Std": {
            "exShowroomPrice": 4750000
          }
        }
      }
    },
    "Countryman Electric": {
      "bodyType": "Electric",
      "fuelTypes": {
        "Electric": [
          "Countryman Favoured Pack",
          "Countryman S"
        ]
      },
      "basePrice": 5565000,
      "variantPrices": {
        "Electric": {
          "Countryman Favoured Pack": {
            "exShowroomPrice": 6070000
          },
          "Countryman S": {
            "exShowroomPrice": 5565000
          }
        }
      }
    }
  },
  "Mahindra": {
    "BE 6": {
      "bodyType": "SUV",
      "fuelTypes": {
        "Electric": [
          "FE 79kWh",
          "FE Four 79kWh",
          "Pack One",
          "Pack Three",
          "Pack Two",
          "SPORTEQ Four 79kWh",
          "SPORTEQ Launch Edition 79kWh",
          "SPORTEQ One 59kWh",
          "SPORTEQ Three 59kWh",
          "SPORTEQ Three 70kWh",
          "SPORTEQ Three Plus 70kWh",
          "SPORTEQ Three Plus 79kWh",
          "SPORTEQ Two 59kWh"
        ]
      },
      "basePrice": 1945000,
      "variantPrices": {
        "Electric": {
          "SPORTEQ Three Plus 70kWh": {
            "exShowroomPrice": 2395000
          },
          "SPORTEQ Two 59kWh": {
            "exShowroomPrice": 2095000
          },
          "FE Four 79kWh": {
            "exShowroomPrice": 2695000
          },
          "SPORTEQ Three 70kWh": {
            "exShowroomPrice": 2295000
          },
          "SPORTEQ One 59kWh": {
            "exShowroomPrice": 1945000
          },
          "FE 79kWh": {
            "exShowroomPrice": 2445000
          },
          "SPORTEQ Four 79kWh": {
            "exShowroomPrice": 2695000
          },
          "SPORTEQ Launch Edition 79kWh": {
            "exShowroomPrice": 2695000
          },
          "SPORTEQ Three 59kWh": {
            "exShowroomPrice": 2195000
          },
          "SPORTEQ Three Plus 79kWh": {
            "exShowroomPrice": 2495000
          }
        }
      }
    },
    "Bolero": {
      "bodyType": "SUV",
      "fuelTypes": {
        "Diesel": [
          "B2",
          "B4",
          "B6",
          "B6 Opt",
          "B6(O)",
          "B8",
          "Camper (crew-cab)",
          "DX",
          "LX",
          "Neo (see also standalone Bolero Neo nameplate)",
          "SLE",
          "SLX",
          "ZLX",
          "ZLX 4WD",
          "ZLX Plus"
        ]
      },
      "basePrice": 849000,
      "variantPrices": {
        "Diesel": {
          "B6": {
            "exShowroomPrice": 929000,
            "engineCC": 1493
          },
          "B6 Opt": {
            "exShowroomPrice": 969000,
            "engineCC": 1493
          },
          "B8": {
            "exShowroomPrice": 999000,
            "engineCC": 1493
          },
          "B4": {
            "exShowroomPrice": 849000,
            "engineCC": 1493
          }
        }
      }
    },
    "Bolero Camper": {
      "bodyType": "Car",
      "fuelTypes": {
        "Diesel": [
          "2WD Non AC",
          "4WD Non AC",
          "Gold ZX",
          "4WD",
          "ZX",
          "Gold RX",
          "Gold RX 4WD"
        ]
      },
      "basePrice": 985000,
      "variantPrices": {
        "Diesel": {
          "2WD Non AC": {
            "exShowroomPrice": 985000,
            "engineCC": 2523
          },
          "4WD Non AC": {
            "exShowroomPrice": 1013000,
            "engineCC": 2523
          },
          "Gold ZX": {
            "exShowroomPrice": 1020000,
            "engineCC": 2523
          },
          "4WD": {
            "exShowroomPrice": 998000,
            "engineCC": 2523
          },
          "ZX": {
            "exShowroomPrice": 1000000,
            "engineCC": 2523
          },
          "Gold RX": {
            "exShowroomPrice": 1025000,
            "engineCC": 2523
          },
          "Gold RX 4WD": {
            "exShowroomPrice": 1049000,
            "engineCC": 2523
          }
        }
      }
    },
    "Bolero Neo": {
      "bodyType": "Compact SUV",
      "fuelTypes": {
        "Diesel": [
          "N4",
          "N8",
          "N10",
          "N10 Opt",
          "N10 R",
          "N10(O)",
          "N10(O) special/top trim",
          "N11"
        ]
      },
      "basePrice": 899000,
      "variantPrices": {
        "Diesel": {
          "N11": {
            "exShowroomPrice": 1030000,
            "engineCC": 1493
          },
          "N8": {
            "exShowroomPrice": 969000,
            "engineCC": 1493
          },
          "N10 Opt": {
            "exShowroomPrice": 1079000,
            "engineCC": 1493
          },
          "N10 R": {
            "exShowroomPrice": 1009000,
            "engineCC": 1493
          },
          "N10": {
            "exShowroomPrice": 997000,
            "engineCC": 1493
          },
          "N4": {
            "exShowroomPrice": 899000,
            "engineCC": 1493
          }
        }
      }
    },
    "Bolero Neo Plus": {
      "bodyType": "SUV",
      "fuelTypes": {
        "Diesel": [
          "P4",
          "P10"
        ]
      },
      "basePrice": 1139000,
      "variantPrices": {
        "Diesel": {
          "P4": {
            "exShowroomPrice": 1139000,
            "engineCC": 2184
          },
          "P10": {
            "exShowroomPrice": 1249000,
            "engineCC": 2184
          }
        }
      }
    },
    "Bolero Pik-Up": {
      "bodyType": "Pickup",
      "fuelTypes": {
        "Diesel": [
          "4WD",
          "FB 1.3 AC",
          "FB 1.3",
          "FB MS",
          "FB PS AC",
          "FB 1.3 MS",
          "4WD CBC",
          "FB PS",
          "4WD AC",
          "FB MS CBC"
        ]
      },
      "basePrice": 949000,
      "variantPrices": {
        "Diesel": {
          "4WD": {
            "exShowroomPrice": 1004000,
            "engineCC": 2523
          },
          "FB 1.3 AC": {
            "exShowroomPrice": 986000,
            "engineCC": 2523
          },
          "FB 1.3": {
            "exShowroomPrice": 963000,
            "engineCC": 2523
          },
          "FB MS": {
            "exShowroomPrice": 1000000,
            "engineCC": 2523
          },
          "FB PS AC": {
            "exShowroomPrice": 1032000,
            "engineCC": 2523
          },
          "FB 1.3 MS": {
            "exShowroomPrice": 956000,
            "engineCC": 2523
          },
          "4WD CBC": {
            "exShowroomPrice": 980000,
            "engineCC": 2523
          },
          "FB PS": {
            "exShowroomPrice": 1007000,
            "engineCC": 2523
          },
          "4WD AC": {
            "exShowroomPrice": 1032000,
            "engineCC": 2523
          },
          "FB MS CBC": {
            "exShowroomPrice": 949000,
            "engineCC": 2523
          }
        }
      }
    },
    "Marazzo": {
      "bodyType": "MPV",
      "fuelTypes": {
        "Diesel": [
          "M2",
          "M2 8Str",
          "M4",
          "M4 Plus",
          "M4 Plus 8Str",
          "M6",
          "M6 Plus",
          "M6 Plus 8Str",
          "M8"
        ]
      },
      "basePrice": 1406000,
      "variantPrices": {
        "Diesel": {
          "M6 Plus": {
            "exShowroomPrice": 1630000,
            "engineCC": 1497
          },
          "M4 Plus 8Str": {
            "exShowroomPrice": 1536000,
            "engineCC": 1497
          },
          "M2 8Str": {
            "exShowroomPrice": 1406000,
            "engineCC": 1497
          },
          "M2": {
            "exShowroomPrice": 1406000,
            "engineCC": 1497
          },
          "M6 Plus 8Str": {
            "exShowroomPrice": 1638000,
            "engineCC": 1497
          },
          "M4 Plus": {
            "exShowroomPrice": 1528000,
            "engineCC": 1497
          }
        }
      }
    },
    "Scorpio": {
      "bodyType": "SUV",
      "fuelTypes": {
        "Diesel": [
          "DX",
          "EX",
          "GLX",
          "Intelli-Hybrid variants",
          "LX",
          "S 7-Seater",
          "S 9-Seater",
          "S2",
          "S3",
          "S4",
          "S5",
          "S6",
          "S7",
          "S7 Automatic",
          "S8",
          "S9",
          "S9 Automatic",
          "S10",
          "S10 4WD",
          "S10 Automatic",
          "S11",
          "S11 7-Seater",
          "S11 7-Seater (Captain Seats)",
          "S11 Automatic",
          "VLX",
          "VLX 4WD",
          "VLX Automatic"
        ]
      },
      "basePrice": 1337000,
      "variantPrices": {
        "Diesel": {
          "S11 7-Seater": {
            "exShowroomPrice": 1740000,
            "engineCC": 2184
          },
          "S 7-Seater": {
            "exShowroomPrice": 1337000,
            "engineCC": 2184
          },
          "S 9-Seater": {
            "exShowroomPrice": 1384000,
            "engineCC": 2184
          },
          "S11 7-Seater (Captain Seats)": {
            "exShowroomPrice": 1740000,
            "engineCC": 2184
          }
        }
      }
    },
    "Scorpio N": {
      "bodyType": "SUV",
      "fuelTypes": {
        "Petrol": [
          "Z8L 7-Seater MT",
          "Z8L 6-Seater MT",
          "Z4 AT",
          "Z2 MT",
          "Z8T AT",
          "Z8T MT",
          "Z8S MT",
          "Z8L 7-Seater AT",
          "Z8L 6-Seater AT",
          "Z8S AT",
          "Z4 MT"
        ],
        "Diesel": [
          "Z8L 6-Seater AT",
          "Z6 AT",
          "Z8T MT",
          "Z8S AT",
          "Z8L 7-Seater AT",
          "Z4 4WD MT",
          "Z8 AT",
          "Z8 MT",
          "Z8L 6-Seater MT",
          "Z8L 7-Seater MT",
          "Z8L 7-Seater 4WD AT",
          "Z8L 7-Seater 4WD MT",
          "Z4 AT",
          "Z8T AT",
          "Z8T 4WD MT",
          "Z8T 4WD AT",
          "Z6 MT",
          "Z8S MT",
          "Z2 MT",
          "Z4 MT"
        ]
      },
      "basePrice": 1369000,
      "variantPrices": {
        "Petrol": {
          "Z8L 7-Seater MT": {
            "exShowroomPrice": 2131000,
            "engineCC": 1997
          },
          "Z8L 6-Seater MT": {
            "exShowroomPrice": 2169000,
            "engineCC": 1997
          },
          "Z4 AT": {
            "exShowroomPrice": 1716000,
            "engineCC": 1997
          },
          "Z2 MT": {
            "exShowroomPrice": 1369000,
            "engineCC": 1997
          },
          "Z8T AT": {
            "exShowroomPrice": 2175000,
            "engineCC": 1997
          },
          "Z8T MT": {
            "exShowroomPrice": 2038000,
            "engineCC": 1997
          },
          "Z8S MT": {
            "exShowroomPrice": 1779000,
            "engineCC": 1997
          },
          "Z8L 7-Seater AT": {
            "exShowroomPrice": 2287000,
            "engineCC": 1997
          },
          "Z8L 6-Seater AT": {
            "exShowroomPrice": 2305000,
            "engineCC": 1997
          },
          "Z8S AT": {
            "exShowroomPrice": 1926000,
            "engineCC": 1997
          },
          "Z4 MT": {
            "exShowroomPrice": 1557000,
            "engineCC": 1997
          }
        },
        "Diesel": {
          "Z8L 6-Seater AT": {
            "exShowroomPrice": 2380000,
            "engineCC": 2198
          },
          "Z6 AT": {
            "exShowroomPrice": 1882000,
            "engineCC": 2198
          },
          "Z8T MT": {
            "exShowroomPrice": 2065000,
            "engineCC": 2198
          },
          "Z8S AT": {
            "exShowroomPrice": 1989000,
            "engineCC": 2198
          },
          "Z8L 7-Seater AT": {
            "exShowroomPrice": 2349000,
            "engineCC": 2198
          },
          "Z4 4WD MT": {
            "exShowroomPrice": 1803000,
            "engineCC": 2198
          },
          "Z8 AT": {
            "exShowroomPrice": 2141000,
            "engineCC": 2198
          },
          "Z8 MT": {
            "exShowroomPrice": 1986000,
            "engineCC": 2198
          },
          "Z8L 6-Seater MT": {
            "exShowroomPrice": 2247000,
            "engineCC": 2198
          },
          "Z8L 7-Seater MT": {
            "exShowroomPrice": 2199000,
            "engineCC": 2198
          },
          "Z8L 7-Seater 4WD AT": {
            "exShowroomPrice": 2549000,
            "engineCC": 2198
          },
          "Z8L 7-Seater 4WD MT": {
            "exShowroomPrice": 2425000,
            "engineCC": 2198
          },
          "Z4 AT": {
            "exShowroomPrice": 1768000,
            "engineCC": 2198
          },
          "Z8T AT": {
            "exShowroomPrice": 2225000,
            "engineCC": 2198
          },
          "Z8T 4WD MT": {
            "exShowroomPrice": 2286000,
            "engineCC": 2198
          },
          "Z8T 4WD AT": {
            "exShowroomPrice": 2439000,
            "engineCC": 2198
          },
          "Z6 MT": {
            "exShowroomPrice": 1717000,
            "engineCC": 2198
          },
          "Z8S MT": {
            "exShowroomPrice": 1879000,
            "engineCC": 2198
          },
          "Z2 MT": {
            "exShowroomPrice": 1419000,
            "engineCC": 2198
          },
          "Z4 MT": {
            "exShowroomPrice": 1612000,
            "engineCC": 2198
          }
        }
      }
    },
    "Thar": {
      "bodyType": "SUV",
      "fuelTypes": {
        "Petrol": [
          "AX(O)",
          "Convertible / soft-top option",
          "LX",
          "LX Automatic (Petrol)",
          "LXT 4WD",
          "LXT 4WD AT",
          "LXT RWD AT"
        ],
        "Diesel": [
          "AX (base, RWD, 4-seat)",
          "AX(O)",
          "AX(O) Automatic (Diesel)",
          "AXT RWD",
          "Convertible / soft-top option",
          "LX",
          "LXT 4WD",
          "LXT 4WD AT",
          "LXT RWD"
        ]
      },
      "basePrice": 1032000,
      "variantPrices": {
        "Petrol": {
          "LXT RWD AT": {
            "exShowroomPrice": 1476000,
            "engineCC": 1997
          },
          "LXT 4WD AT": {
            "exShowroomPrice": 1723000,
            "engineCC": 1997
          },
          "LXT 4WD": {
            "exShowroomPrice": 1559000,
            "engineCC": 1997
          }
        },
        "Diesel": {
          "AXT RWD": {
            "exShowroomPrice": 1032000,
            "engineCC": 1497
          },
          "LXT RWD": {
            "exShowroomPrice": 1299000,
            "engineCC": 1497
          },
          "LXT 4WD": {
            "exShowroomPrice": 1643000,
            "engineCC": 1497
          },
          "LXT 4WD AT": {
            "exShowroomPrice": 1780000,
            "engineCC": 2184
          }
        }
      }
    },
    "Thar ROXX": {
      "bodyType": "SUV",
      "fuelTypes": {
        "Diesel": [
          "AX7L 4WD AT",
          "AX7L 4WD",
          "AX5L 4WD AT",
          "Star Edition",
          "MX5 RWD",
          "MX3 RWD",
          "AX7L RWD",
          "MX3 RWD AT",
          "AX7L RWD AT",
          "MX5 4WD",
          "AX3L RWD",
          "MX1 RWD",
          "MX5 RWD AT",
          "AX5L RWD AT",
          "Star Edition AT"
        ],
        "Petrol": [
          "MX1 RWD",
          "AX7L RWD AT",
          "MX5 RWD",
          "MX5 RWD AT",
          "MX3 RWD AT",
          "Star Edition AT"
        ]
      },
      "basePrice": 1252000,
      "variantPrices": {
        "Diesel": {
          "AX7L 4WD AT": {
            "exShowroomPrice": 2352000,
            "engineCC": 2184
          },
          "AX7L 4WD": {
            "exShowroomPrice": 2212000,
            "engineCC": 2184
          },
          "AX5L 4WD AT": {
            "exShowroomPrice": 2152000,
            "engineCC": 2184
          },
          "Star Edition": {
            "exShowroomPrice": 1777000,
            "engineCC": 2184
          },
          "MX5 RWD": {
            "exShowroomPrice": 1702000,
            "engineCC": 2184
          },
          "MX3 RWD": {
            "exShowroomPrice": 1628000,
            "engineCC": 2184
          },
          "AX7L RWD": {
            "exShowroomPrice": 1952000,
            "engineCC": 2184
          },
          "MX3 RWD AT": {
            "exShowroomPrice": 1782000,
            "engineCC": 2184
          },
          "AX7L RWD AT": {
            "exShowroomPrice": 2078000,
            "engineCC": 2184
          },
          "MX5 4WD": {
            "exShowroomPrice": 1942000,
            "engineCC": 2184
          },
          "AX3L RWD": {
            "exShowroomPrice": 1728000,
            "engineCC": 2184
          },
          "MX1 RWD": {
            "exShowroomPrice": 1423000,
            "engineCC": 2184
          },
          "MX5 RWD AT": {
            "exShowroomPrice": 1852000,
            "engineCC": 2184
          },
          "AX5L RWD AT": {
            "exShowroomPrice": 1928000,
            "engineCC": 2184
          },
          "Star Edition AT": {
            "exShowroomPrice": 1929000,
            "engineCC": 2184
          }
        },
        "Petrol": {
          "MX1 RWD": {
            "exShowroomPrice": 1252000,
            "engineCC": 1997
          },
          "AX7L RWD AT": {
            "exShowroomPrice": 2000000,
            "engineCC": 1997
          },
          "MX5 RWD": {
            "exShowroomPrice": 1652000,
            "engineCC": 1997
          },
          "MX5 RWD AT": {
            "exShowroomPrice": 1802000,
            "engineCC": 1997
          },
          "MX3 RWD AT": {
            "exShowroomPrice": 1528000,
            "engineCC": 1997
          },
          "Star Edition AT": {
            "exShowroomPrice": 1879000,
            "engineCC": 1997
          }
        }
      }
    },
    "XEV 9S": {
      "bodyType": "Electric",
      "fuelTypes": {
        "Electric": [
          "Pack Three 79kWh 6-Seater",
          "Pack One Above 59kWh 7-Seater",
          "Pack One Above 79kWh 7-Seater",
          "Pack Three Above 79kWh 6-Seater",
          "Pack Three Above 79kWh 7-Seater",
          "Pack Two Above 70kWh 7-Seater",
          "Pack Two Above 70kWh 6-Seater",
          "Pack Two Above 79kWh 7-Seater",
          "Pack Three 79kWh 7-Seater",
          "Pack Two Above 79kWh 6-Seater"
        ]
      },
      "basePrice": 2065000,
      "variantPrices": {
        "Electric": {
          "Pack Three 79kWh 6-Seater": {
            "exShowroomPrice": 2880000
          },
          "Pack One Above 59kWh 7-Seater": {
            "exShowroomPrice": 2065000
          },
          "Pack One Above 79kWh 7-Seater": {
            "exShowroomPrice": 2265000
          },
          "Pack Three Above 79kWh 6-Seater": {
            "exShowroomPrice": 3090000
          },
          "Pack Three Above 79kWh 7-Seater": {
            "exShowroomPrice": 2995000
          },
          "Pack Two Above 70kWh 7-Seater": {
            "exShowroomPrice": 2505000
          },
          "Pack Two Above 70kWh 6-Seater": {
            "exShowroomPrice": 2600000
          },
          "Pack Two Above 79kWh 7-Seater": {
            "exShowroomPrice": 2595000
          },
          "Pack Three 79kWh 7-Seater": {
            "exShowroomPrice": 2785000
          },
          "Pack Two Above 79kWh 6-Seater": {
            "exShowroomPrice": 2690000
          }
        }
      }
    },
    "XEV 9e": {
      "bodyType": "SUV (Electric)",
      "fuelTypes": {
        "Electric": [
          "Cineluxe Edition",
          "Pack One",
          "Pack One 7.2kw Charger",
          "Pack One 11.2kw Charger",
          "Pack Three",
          "Pack Three 7.2kw Charger",
          "Pack Three 11.2kw Charger",
          "Pack Three Select",
          "Pack Three Select 7.2kw Charger",
          "Pack Three Select 11.2kw Charger",
          "Pack Two",
          "Pack Two 7.2kw Charger",
          "Pack Two 11.2kw Charger",
          "Pack Two 79kWh",
          "Pack Two 79kwh 7.2kw Charger",
          "Pack Two 79kwh 11.2kw Charger"
        ]
      },
      "basePrice": 2190000,
      "variantPrices": {
        "Electric": {
          "Pack Two 79kwh 7.2kw Charger": {
            "exShowroomPrice": 2700000
          },
          "Pack One 11.2kw Charger": {
            "exShowroomPrice": 2265000
          },
          "Pack Three Select": {
            "exShowroomPrice": 2790000
          },
          "Cineluxe Edition": {
            "exShowroomPrice": 2935000
          },
          "Pack Three Select 7.2kw Charger": {
            "exShowroomPrice": 2840000
          },
          "Pack Three": {
            "exShowroomPrice": 3050000
          },
          "Pack Three 11.2kw Charger": {
            "exShowroomPrice": 3125000
          },
          "Pack Two 11.2kw Charger": {
            "exShowroomPrice": 2565000
          },
          "Pack Three Select 11.2kw Charger": {
            "exShowroomPrice": 2865000
          },
          "Pack Two 79kwh 11.2kw Charger": {
            "exShowroomPrice": 2725000
          },
          "Pack Two 79kWh": {
            "exShowroomPrice": 2650000
          },
          "Pack Three 7.2kw Charger": {
            "exShowroomPrice": 3100000
          },
          "Pack One 7.2kw Charger": {
            "exShowroomPrice": 2240000
          },
          "Pack Two": {
            "exShowroomPrice": 2490000
          },
          "Pack One": {
            "exShowroomPrice": 2190000
          },
          "Pack Two 7.2kw Charger": {
            "exShowroomPrice": 2540000
          }
        }
      }
    },
    "XUV 3XO": {
      "bodyType": "Compact SUV (facelift/rename of XUV300)",
      "fuelTypes": {
        "Petrol": [
          "AX3",
          "AX5",
          "AX5 AT",
          "AX5 L Turbo",
          "AX5 L Turbo AT",
          "AX5L",
          "AX7",
          "AX7 L Turbo",
          "AX7 L Turbo AT",
          "AX7 Turbo",
          "AX7 Turbo AT",
          "AX7L",
          "AX7L Turbo Petrol (top, DCT/AMT)",
          "MX1",
          "MX2",
          "MX2 Pro",
          "MX2 Pro AT",
          "MX3",
          "MX3 AT",
          "MX3 Pro",
          "MX3 Pro AT",
          "REVX A Turbo",
          "REVX A Turbo AT",
          "REVX M",
          "REVX M (O)"
        ],
        "Diesel": [
          "AX3",
          "AX5",
          "AX5 AMT",
          "AX5L",
          "AX7",
          "AX7 AMT",
          "AX7 L",
          "AX7L",
          "MX1",
          "MX2",
          "MX2 diesel",
          "MX2 Pro",
          "MX3",
          "MX3 AMT",
          "MX3 Pro"
        ]
      },
      "basePrice": 779000,
      "variantPrices": {
        "Petrol": {
          "MX2 Pro": {
            "exShowroomPrice": 908000,
            "engineCC": 1197
          },
          "MX3 AT": {
            "exShowroomPrice": 1085000,
            "engineCC": 1197
          },
          "MX3": {
            "exShowroomPrice": 929000,
            "engineCC": 1197
          },
          "MX1": {
            "exShowroomPrice": 779000,
            "engineCC": 1197
          },
          "AX5 AT": {
            "exShowroomPrice": 1188000,
            "engineCC": 1197
          },
          "AX7 L Turbo AT": {
            "exShowroomPrice": 1504000,
            "engineCC": 1197
          },
          "MX3 Pro": {
            "exShowroomPrice": 951000,
            "engineCC": 1197
          },
          "AX7 Turbo AT": {
            "exShowroomPrice": 1334000,
            "engineCC": 1197
          },
          "REVX A Turbo": {
            "exShowroomPrice": 1128000,
            "engineCC": 1197
          },
          "MX2 Pro AT": {
            "exShowroomPrice": 999000,
            "engineCC": 1197
          },
          "MX3 Pro AT": {
            "exShowroomPrice": 1113000,
            "engineCC": 1197
          },
          "AX7 Turbo": {
            "exShowroomPrice": 1220000,
            "engineCC": 1197
          },
          "AX5": {
            "exShowroomPrice": 1030000,
            "engineCC": 1197
          },
          "AX5 L Turbo AT": {
            "exShowroomPrice": 1328000,
            "engineCC": 1197
          },
          "AX5 L Turbo": {
            "exShowroomPrice": 1203000,
            "engineCC": 1197
          },
          "AX7 L Turbo": {
            "exShowroomPrice": 1332000,
            "engineCC": 1197
          },
          "REVX A Turbo AT": {
            "exShowroomPrice": 1239000,
            "engineCC": 1197
          },
          "REVX M (O)": {
            "exShowroomPrice": 909000,
            "engineCC": 1197
          },
          "REVX M": {
            "exShowroomPrice": 859000,
            "engineCC": 1197
          }
        },
        "Diesel": {
          "MX3 AMT": {
            "exShowroomPrice": 1122000,
            "engineCC": 1498
          },
          "AX7 L": {
            "exShowroomPrice": 1407000,
            "engineCC": 1498
          },
          "MX3": {
            "exShowroomPrice": 1031000,
            "engineCC": 1498
          },
          "MX3 Pro": {
            "exShowroomPrice": 1086000,
            "engineCC": 1498
          },
          "MX2 Pro": {
            "exShowroomPrice": 1000000,
            "engineCC": 1498
          },
          "AX7 AMT": {
            "exShowroomPrice": 1379000,
            "engineCC": 1498
          },
          "AX5": {
            "exShowroomPrice": 1139000,
            "engineCC": 1498
          },
          "AX5 AMT": {
            "exShowroomPrice": 1220000,
            "engineCC": 1498
          },
          "MX2 diesel": {
            "exShowroomPrice": 936000,
            "engineCC": 1498
          },
          "AX7": {
            "exShowroomPrice": 1304000,
            "engineCC": 1498
          }
        }
      }
    },
    "XUV 3XO EV": {
      "bodyType": "SUV",
      "fuelTypes": {
        "Electric": [
          "AX7L",
          "AX5"
        ]
      },
      "basePrice": 1389000,
      "variantPrices": {
        "Electric": {
          "AX7L": {
            "exShowroomPrice": 1496000
          },
          "AX5": {
            "exShowroomPrice": 1389000
          }
        }
      }
    },
    "XUV 7XO": {
      "bodyType": "SUV",
      "fuelTypes": {
        "Diesel": [
          "AX3",
          "AX7T AT",
          "AX7T",
          "AX7T 6Str AT",
          "AX7",
          "AX7L",
          "AX7T AWD AT",
          "AX5",
          "AX7L 6Str AT",
          "AX7T 6Str",
          "AX5 AT",
          "AX7L AT",
          "AX7 AT",
          "AX3 AT",
          "AX7L AWD AT",
          "AX"
        ],
        "Petrol": [
          "AX7T AT",
          "AX",
          "AX7T 6Str AT",
          "AX5 AT",
          "AX5",
          "AX7L 6Str AT",
          "AX7 AT",
          "AX7",
          "AX3",
          "AX7L AT",
          "AX3 AT"
        ]
      },
      "basePrice": 1399000,
      "variantPrices": {
        "Diesel": {
          "AX3": {
            "exShowroomPrice": 1679000,
            "engineCC": 2184
          },
          "AX7T AT": {
            "exShowroomPrice": 2309000,
            "engineCC": 2184
          },
          "AX7T": {
            "exShowroomPrice": 2164000,
            "engineCC": 2184
          },
          "AX7T 6Str AT": {
            "exShowroomPrice": 2329000,
            "engineCC": 2184
          },
          "AX7": {
            "exShowroomPrice": 1960000,
            "engineCC": 2184
          },
          "AX7L": {
            "exShowroomPrice": 2329000,
            "engineCC": 2184
          },
          "AX7T AWD AT": {
            "exShowroomPrice": 2399000,
            "engineCC": 2184
          },
          "AX5": {
            "exShowroomPrice": 1829000,
            "engineCC": 2184
          },
          "AX7L 6Str AT": {
            "exShowroomPrice": 2499000,
            "engineCC": 2184
          },
          "AX7T 6Str": {
            "exShowroomPrice": 2184000,
            "engineCC": 2184
          },
          "AX5 AT": {
            "exShowroomPrice": 1979000,
            "engineCC": 2184
          },
          "AX7L AT": {
            "exShowroomPrice": 2479000,
            "engineCC": 2184
          },
          "AX7 AT": {
            "exShowroomPrice": 2105000,
            "engineCC": 2184
          },
          "AX3 AT": {
            "exShowroomPrice": 1829000,
            "engineCC": 2184
          },
          "AX7L AWD AT": {
            "exShowroomPrice": 2579000,
            "engineCC": 2184
          },
          "AX": {
            "exShowroomPrice": 1529000,
            "engineCC": 2184
          }
        },
        "Petrol": {
          "AX7T AT": {
            "exShowroomPrice": 2262000,
            "engineCC": 1997
          },
          "AX": {
            "exShowroomPrice": 1399000,
            "engineCC": 1997
          },
          "AX7T 6Str AT": {
            "exShowroomPrice": 2282000,
            "engineCC": 1997
          },
          "AX5 AT": {
            "exShowroomPrice": 1929000,
            "engineCC": 1997
          },
          "AX5": {
            "exShowroomPrice": 1779000,
            "engineCC": 1997
          },
          "AX7L 6Str AT": {
            "exShowroomPrice": 2449000,
            "engineCC": 1997
          },
          "AX7 AT": {
            "exShowroomPrice": 2058000,
            "engineCC": 1997
          },
          "AX7": {
            "exShowroomPrice": 1913000,
            "engineCC": 1997
          },
          "AX3": {
            "exShowroomPrice": 1629000,
            "engineCC": 1997
          },
          "AX7L AT": {
            "exShowroomPrice": 2429000,
            "engineCC": 1997
          },
          "AX3 AT": {
            "exShowroomPrice": 1779000,
            "engineCC": 1997
          }
        }
      }
    },
    "XUV400 EV": {
      "bodyType": "SUV",
      "fuelTypes": {
        "Electric": [
          "EL Pro DT 34.5 kWh",
          "EC Pro 34.5 kWh",
          "EL Pro 34.5 kWh",
          "EL Pro 39.4 kWh",
          "EL Pro DT 39.4 kWh"
        ]
      },
      "basePrice": 1549000,
      "variantPrices": {
        "Electric": {
          "EL Pro DT 34.5 kWh": {
            "exShowroomPrice": 1694000
          },
          "EC Pro 34.5 kWh": {
            "exShowroomPrice": 1549000
          },
          "EL Pro 34.5 kWh": {
            "exShowroomPrice": 1674000
          },
          "EL Pro 39.4 kWh": {
            "exShowroomPrice": 1749000
          },
          "EL Pro DT 39.4 kWh": {
            "exShowroomPrice": 1769000
          }
        }
      }
    }
  },
  "Maruti Suzuki": {
    "Alto K10": {
      "bodyType": "Hatchback",
      "fuelTypes": {
        "Petrol": [
          "LXi",
          "LXI (O)",
          "Std",
          "STD (O)",
          "VXi",
          "VXI (O)",
          "VXI (O) AT",
          "VXI Plus (O)",
          "VXI Plus (O) AT",
          "VXi+"
        ],
        "CNG": [
          "CNG variant",
          "LXI (O) S-",
          "VXI (O) S-"
        ]
      },
      "basePrice": 370000,
      "variantPrices": {
        "Petrol": {
          "VXI Plus (O) AT": {
            "exShowroomPrice": 545000,
            "engineCC": 998
          },
          "VXI (O)": {
            "exShowroomPrice": 452000,
            "engineCC": 998
          },
          "VXI Plus (O)": {
            "exShowroomPrice": 500000,
            "engineCC": 998
          },
          "LXI (O)": {
            "exShowroomPrice": 400000,
            "engineCC": 998
          },
          "VXI (O) AT": {
            "exShowroomPrice": 497000,
            "engineCC": 998
          },
          "STD (O)": {
            "exShowroomPrice": 370000,
            "engineCC": 998
          }
        },
        "CNG": {
          "VXI (O) S-": {
            "exShowroomPrice": 534000,
            "engineCC": 998
          },
          "LXI (O) S-": {
            "exShowroomPrice": 484000,
            "engineCC": 998
          }
        }
      }
    },
    "Alto Tour H1": {
      "bodyType": "Hatchback",
      "fuelTypes": {
        "CNG": [
          "Alto Tour H1"
        ],
        "Petrol": [
          "Alto Tour H1"
        ]
      },
      "basePrice": 400000,
      "variantPrices": {
        "CNG": {
          "Alto Tour H1": {
            "exShowroomPrice": 482000,
            "engineCC": 998
          }
        },
        "Petrol": {
          "Alto Tour H1": {
            "exShowroomPrice": 400000,
            "engineCC": 998
          }
        }
      }
    },
    "Baleno": {
      "bodyType": "Hatchback",
      "fuelTypes": {
        "CNG": [
          "Delta",
          "Zeta"
        ],
        "Petrol": [
          "Alpha",
          "Alpha AMT",
          "Altura",
          "Delta",
          "Delta AMT",
          "LXi/VXi (generic ladder)",
          "Sigma",
          "Zeta",
          "Zeta AMT"
        ],
        "Diesel": [
          "Alpha",
          "Delta",
          "Sigma",
          "Zeta"
        ]
      },
      "basePrice": 599000,
      "variantPrices": {
        "CNG": {
          "Zeta": {
            "exShowroomPrice": 882000,
            "engineCC": 1197
          },
          "Delta": {
            "exShowroomPrice": 785000,
            "engineCC": 1197
          }
        },
        "Petrol": {
          "Sigma": {
            "exShowroomPrice": 599000,
            "engineCC": 1197
          },
          "Delta": {
            "exShowroomPrice": 692000,
            "engineCC": 1197
          },
          "Alpha": {
            "exShowroomPrice": 897000,
            "engineCC": 1197
          },
          "Delta AMT": {
            "exShowroomPrice": 742000,
            "engineCC": 1197
          },
          "Zeta AMT": {
            "exShowroomPrice": 840000,
            "engineCC": 1197
          },
          "Zeta": {
            "exShowroomPrice": 790000,
            "engineCC": 1197
          },
          "Alpha AMT": {
            "exShowroomPrice": 947000,
            "engineCC": 1197
          }
        },
        "Diesel": {}
      }
    },
    "Brezza": {
      "bodyType": "SUV",
      "fuelTypes": {
        "CNG": [
          "CNG variant",
          "LXi",
          "VXi",
          "ZXi",
          "ZXi Dual Tone"
        ],
        "Petrol": [
          "LXi",
          "LXi Turbo",
          "VXi",
          "VXi AT",
          "VXi Turbo",
          "ZXi",
          "ZXi AT",
          "ZXi AT Dual Tone",
          "ZXi Dual Tone",
          "ZXi Plus AT",
          "ZXi Plus AT Dual Tone",
          "ZXi Plus Turbo",
          "ZXi Plus Turbo Dual Tone",
          "ZXi Turbo",
          "ZXi Turbo Dual Tone",
          "ZXi+"
        ]
      },
      "basePrice": 740000,
      "variantPrices": {
        "CNG": {
          "ZXi Dual Tone": {
            "exShowroomPrice": 1171000,
            "engineCC": 1462
          },
          "LXi": {
            "exShowroomPrice": 935000,
            "engineCC": 1462
          },
          "ZXi": {
            "exShowroomPrice": 1155000,
            "engineCC": 1462
          },
          "VXi": {
            "exShowroomPrice": 999000,
            "engineCC": 1462
          }
        },
        "Petrol": {
          "VXi AT": {
            "exShowroomPrice": 1061000,
            "engineCC": 1462
          },
          "LXi Turbo": {
            "exShowroomPrice": 740000,
            "engineCC": 998
          },
          "LXi": {
            "exShowroomPrice": 830000,
            "engineCC": 1462
          },
          "VXi": {
            "exShowroomPrice": 926000,
            "engineCC": 1462
          },
          "ZXi Plus AT": {
            "exShowroomPrice": 1355000,
            "engineCC": 1462
          },
          "ZXi Plus AT Dual Tone": {
            "exShowroomPrice": 1371000,
            "engineCC": 1462
          },
          "ZXi AT": {
            "exShowroomPrice": 1185000,
            "engineCC": 1462
          },
          "ZXi Dual Tone": {
            "exShowroomPrice": 1065000,
            "engineCC": 1462
          },
          "ZXi Turbo": {
            "exShowroomPrice": 985000,
            "engineCC": 998
          },
          "ZXi": {
            "exShowroomPrice": 1050000,
            "engineCC": 1462
          },
          "ZXi Turbo Dual Tone": {
            "exShowroomPrice": 999000,
            "engineCC": 998
          },
          "ZXi Plus Turbo": {
            "exShowroomPrice": 1116000,
            "engineCC": 998
          },
          "ZXi Plus Turbo Dual Tone": {
            "exShowroomPrice": 1131000,
            "engineCC": 998
          },
          "ZXi AT Dual Tone": {
            "exShowroomPrice": 1201000,
            "engineCC": 1462
          },
          "VXi Turbo": {
            "exShowroomPrice": 855000,
            "engineCC": 998
          },
          "ZXi+": {
            "exShowroomPrice": 1050000,
            "engineCC": 1462,
            "source": "existing_variant_price_alias"
          }
        }
      }
    },
    "Celerio": {
      "bodyType": "Hatchback",
      "fuelTypes": {
        "Petrol": [
          "LXI",
          "LXi",
          "VXI",
          "VXi",
          "VXi (AMT)",
          "VXI AMT",
          "VXi/ZXi",
          "ZXI",
          "ZXi",
          "ZXi (AMT)",
          "ZXI AMT",
          "ZXI Plus",
          "ZXI Plus AMT",
          "ZXi+"
        ],
        "CNG": [
          "CNG variant",
          "Green (CNG) VXi",
          "VXI"
        ]
      },
      "basePrice": 470000,
      "variantPrices": {
        "Petrol": {
          "VXI AMT": {
            "exShowroomPrice": 563000,
            "engineCC": 998
          },
          "ZXI": {
            "exShowroomPrice": 573000,
            "engineCC": 998
          },
          "LXI": {
            "exShowroomPrice": 470000,
            "engineCC": 998
          },
          "VXI": {
            "exShowroomPrice": 518000,
            "engineCC": 998
          },
          "ZXI Plus AMT": {
            "exShowroomPrice": 675000,
            "engineCC": 998
          },
          "ZXI AMT": {
            "exShowroomPrice": 618000,
            "engineCC": 998
          },
          "ZXI Plus": {
            "exShowroomPrice": 630000,
            "engineCC": 998
          },
          "LXi": {
            "exShowroomPrice": 470000,
            "engineCC": 998,
            "source": "existing_variant_price_alias"
          },
          "VXi": {
            "exShowroomPrice": 518000,
            "engineCC": 998,
            "source": "existing_variant_price_alias"
          },
          "VXi (AMT)": {
            "exShowroomPrice": 563000,
            "engineCC": 998,
            "source": "existing_variant_price_alias"
          },
          "ZXi": {
            "exShowroomPrice": 573000,
            "engineCC": 998,
            "source": "existing_variant_price_alias"
          },
          "ZXi (AMT)": {
            "exShowroomPrice": 618000,
            "engineCC": 998,
            "source": "existing_variant_price_alias"
          },
          "ZXi+": {
            "exShowroomPrice": 573000,
            "engineCC": 998,
            "source": "existing_variant_price_alias"
          }
        },
        "CNG": {
          "VXI": {
            "exShowroomPrice": 598000,
            "engineCC": 998
          }
        }
      }
    },
    "Ciaz": {
      "bodyType": "Sedan",
      "fuelTypes": {
        "Petrol": [
          "Alpha",
          "Alpha AT",
          "Delta",
          "Delta AT",
          "Sigma",
          "Zeta",
          "Zeta AT"
        ],
        "Diesel": [
          "Alpha",
          "Delta",
          "Sigma",
          "Zeta"
        ],
        "Petrol Hybrid": [
          "Alpha",
          "Delta",
          "Sigma",
          "Zeta"
        ]
      },
      "basePrice": 909000,
      "variantPrices": {
        "Petrol": {
          "Sigma": {
            "exShowroomPrice": 909000,
            "engineCC": 1462
          },
          "Alpha AT": {
            "exShowroomPrice": 1188000,
            "engineCC": 1462
          },
          "Delta AT": {
            "exShowroomPrice": 1073000,
            "engineCC": 1462
          },
          "Alpha": {
            "exShowroomPrice": 1082000,
            "engineCC": 1462
          },
          "Zeta AT": {
            "exShowroomPrice": 1112000,
            "engineCC": 1462
          },
          "Zeta": {
            "exShowroomPrice": 1005000,
            "engineCC": 1462
          },
          "Delta": {
            "exShowroomPrice": 965000,
            "engineCC": 1462
          }
        },
        "Diesel": {},
        "Petrol Hybrid": {}
      }
    },
    "Dzire": {
      "bodyType": "Sedan",
      "fuelTypes": {
        "Petrol": [
          "LXI",
          "LXi",
          "VXI",
          "VXi",
          "VXI AMT",
          "ZXI",
          "ZXi",
          "ZXI AMT",
          "ZXI Plus",
          "ZXI Plus AMT",
          "ZXi+"
        ],
        "CNG": [
          "CNG variant",
          "VXI",
          "ZXI"
        ],
        "Diesel": [
          "LDi",
          "VDi",
          "ZDi",
          "ZDi+"
        ]
      },
      "basePrice": 631000,
      "variantPrices": {
        "Petrol": {
          "ZXI AMT": {
            "exShowroomPrice": 873000,
            "engineCC": 1197
          },
          "ZXI Plus AMT": {
            "exShowroomPrice": 941000,
            "engineCC": 1197
          },
          "LXI": {
            "exShowroomPrice": 631000,
            "engineCC": 1197
          },
          "ZXI Plus": {
            "exShowroomPrice": 896000,
            "engineCC": 1197
          },
          "VXI": {
            "exShowroomPrice": 727000,
            "engineCC": 1197
          },
          "ZXI": {
            "exShowroomPrice": 828000,
            "engineCC": 1197
          },
          "VXI AMT": {
            "exShowroomPrice": 772000,
            "engineCC": 1197
          },
          "LXi": {
            "exShowroomPrice": 631000,
            "engineCC": 1197,
            "source": "existing_variant_price_alias"
          },
          "VXi": {
            "exShowroomPrice": 727000,
            "engineCC": 1197,
            "source": "existing_variant_price_alias"
          },
          "ZXi": {
            "exShowroomPrice": 828000,
            "engineCC": 1197,
            "source": "existing_variant_price_alias"
          },
          "ZXi+": {
            "exShowroomPrice": 828000,
            "engineCC": 1197,
            "source": "existing_variant_price_alias"
          }
        },
        "CNG": {
          "VXI": {
            "exShowroomPrice": 818000,
            "engineCC": 1197
          },
          "ZXI": {
            "exShowroomPrice": 919000,
            "engineCC": 1197
          }
        },
        "Diesel": {}
      }
    },
    "Dzire Tour S": {
      "bodyType": "Sedan",
      "fuelTypes": {
        "Petrol": [
          "STD"
        ],
        "CNG": [
          "Dzire Tour S"
        ]
      },
      "basePrice": 624000,
      "variantPrices": {
        "Petrol": {
          "STD": {
            "exShowroomPrice": 624000,
            "engineCC": 1197
          }
        },
        "CNG": {
          "Dzire Tour S": {
            "exShowroomPrice": 710000,
            "engineCC": 1197
          }
        }
      }
    },
    "Eeco": {
      "bodyType": "Van/MPV",
      "fuelTypes": {
        "Petrol": [
          "5 Seater AC",
          "5 Seater STD",
          "5-Seater AC",
          "5-Seater STD",
          "6 Seater STD",
          "7-Seater AC",
          "7-Seater STD",
          "Cargo"
        ],
        "CNG": [
          "5 Seater AC",
          "CNG variant"
        ]
      },
      "basePrice": 528000,
      "variantPrices": {
        "Petrol": {
          "5 Seater STD": {
            "exShowroomPrice": 528000,
            "engineCC": 1197
          },
          "6 Seater STD": {
            "exShowroomPrice": 555000,
            "engineCC": 1197
          },
          "5 Seater AC": {
            "exShowroomPrice": 561000,
            "engineCC": 1197
          },
          "5-Seater AC": {
            "exShowroomPrice": 561000,
            "engineCC": 1197,
            "source": "existing_variant_price_alias"
          },
          "5-Seater STD": {
            "exShowroomPrice": 528000,
            "engineCC": 1197,
            "source": "existing_variant_price_alias"
          }
        },
        "CNG": {
          "5 Seater AC": {
            "exShowroomPrice": 646000,
            "engineCC": 1197
          }
        }
      }
    },
    "Eeco Tour V": {
      "bodyType": "MPV",
      "fuelTypes": {
        "Petrol": [
          "6 Seater STD",
          "5 Seater STD",
          "5 Seater AC"
        ],
        "CNG": [
          "5 Seater AC"
        ]
      },
      "basePrice": 518000,
      "variantPrices": {
        "Petrol": {
          "6 Seater STD": {
            "exShowroomPrice": 546000,
            "engineCC": 1197
          },
          "5 Seater STD": {
            "exShowroomPrice": 518000,
            "engineCC": 1197
          },
          "5 Seater AC": {
            "exShowroomPrice": 551000,
            "engineCC": 1197
          }
        },
        "CNG": {
          "5 Seater AC": {
            "exShowroomPrice": 633000,
            "engineCC": 1197
          }
        }
      }
    },
    "Ertiga": {
      "bodyType": "MPV",
      "fuelTypes": {
        "Petrol": [
          "Lxi",
          "LXi",
          "VXi",
          "VXI AT",
          "Zxi",
          "ZXi",
          "ZXI AT",
          "ZXI Plus",
          "ZXI Plus AT",
          "ZXi+"
        ],
        "CNG": [
          "CNG variant",
          "VXi",
          "ZXI"
        ],
        "Diesel": [
          "LDi",
          "VDi",
          "ZDi",
          "ZDi+"
        ],
        "Petrol Hybrid": [
          "LXi",
          "VXi",
          "ZXi",
          "ZXi+"
        ]
      },
      "basePrice": 890000,
      "variantPrices": {
        "Petrol": {
          "ZXI Plus": {
            "exShowroomPrice": 1169000,
            "engineCC": 1462
          },
          "VXi": {
            "exShowroomPrice": 995000,
            "engineCC": 1462
          },
          "ZXI Plus AT": {
            "exShowroomPrice": 1304000,
            "engineCC": 1462
          },
          "VXI AT": {
            "exShowroomPrice": 1130000,
            "engineCC": 1462
          },
          "Lxi": {
            "exShowroomPrice": 890000,
            "engineCC": 1462
          },
          "ZXI AT": {
            "exShowroomPrice": 1237000,
            "engineCC": 1462
          },
          "Zxi": {
            "exShowroomPrice": 1102000,
            "engineCC": 1462
          },
          "LXi": {
            "exShowroomPrice": 890000,
            "engineCC": 1462,
            "source": "existing_variant_price_alias"
          },
          "ZXi": {
            "exShowroomPrice": 1102000,
            "engineCC": 1462,
            "source": "existing_variant_price_alias"
          },
          "ZXi+": {
            "exShowroomPrice": 1102000,
            "engineCC": 1462,
            "source": "existing_variant_price_alias"
          }
        },
        "CNG": {
          "ZXI": {
            "exShowroomPrice": 1200000,
            "engineCC": 1462
          },
          "VXi": {
            "exShowroomPrice": 1094000,
            "engineCC": 1462
          }
        },
        "Diesel": {},
        "Petrol Hybrid": {}
      }
    },
    "Ertiga Tour": {
      "bodyType": "MPV",
      "fuelTypes": {
        "CNG": [
          "STD"
        ],
        "Petrol": [
          "STD"
        ]
      },
      "basePrice": 968000,
      "variantPrices": {
        "CNG": {
          "STD": {
            "exShowroomPrice": 1059000,
            "engineCC": 1462
          }
        },
        "Petrol": {
          "STD": {
            "exShowroomPrice": 968000,
            "engineCC": 1462
          }
        }
      }
    },
    "FRONX": {
      "bodyType": "SUV",
      "fuelTypes": {
        "Petrol": [
          "Alpha Turbo DT",
          "Alpha Turbo",
          "Delta AMT",
          "Zeta Turbo",
          "Sigma",
          "Delta Plus Turbo",
          "Delta Plus",
          "Delta Plus AMT",
          "Alpha Turbo AT",
          "Delta",
          "Zeta Turbo AT",
          "Alpha Turbo DT AT"
        ],
        "CNG": [
          "Sigma",
          "Delta"
        ]
      },
      "basePrice": 685000,
      "variantPrices": {
        "Petrol": {
          "Alpha Turbo DT": {
            "exShowroomPrice": 1070000,
            "engineCC": 998
          },
          "Alpha Turbo": {
            "exShowroomPrice": 1056000,
            "engineCC": 998
          },
          "Delta AMT": {
            "exShowroomPrice": 825000,
            "engineCC": 1197
          },
          "Zeta Turbo": {
            "exShowroomPrice": 971000,
            "engineCC": 998
          },
          "Sigma": {
            "exShowroomPrice": 685000,
            "engineCC": 1197
          },
          "Delta Plus Turbo": {
            "exShowroomPrice": 892000,
            "engineCC": 998
          },
          "Delta Plus": {
            "exShowroomPrice": 814000,
            "engineCC": 1197
          },
          "Delta Plus AMT": {
            "exShowroomPrice": 864000,
            "engineCC": 1197
          },
          "Alpha Turbo AT": {
            "exShowroomPrice": 1184000,
            "engineCC": 998
          },
          "Delta": {
            "exShowroomPrice": 775000,
            "engineCC": 1197
          },
          "Zeta Turbo AT": {
            "exShowroomPrice": 1099000,
            "engineCC": 998
          },
          "Alpha Turbo DT AT": {
            "exShowroomPrice": 1198000,
            "engineCC": 998
          }
        },
        "CNG": {
          "Sigma": {
            "exShowroomPrice": 789000,
            "engineCC": 1197
          },
          "Delta": {
            "exShowroomPrice": 874000,
            "engineCC": 1197
          }
        }
      }
    },
    "Grand Vitara": {
      "bodyType": "SUV",
      "fuelTypes": {
        "CNG": [
          "Delta",
          "Zeta",
          "Zeta DT"
        ],
        "Petrol": [
          "AllGrip AWD Alpha",
          "Alpha",
          "Alpha AT",
          "Alpha AT DT",
          "Alpha AWD AT",
          "Alpha AWD AT DT",
          "Alpha AWD Opt AT",
          "Alpha AWD Opt AT DT",
          "Alpha DT",
          "Alpha Opt",
          "Alpha Opt AT",
          "Alpha Opt AT DT",
          "Alpha Opt DT",
          "Alpha Plus Hybrid CVT",
          "Alpha Plus Hybrid CVT DT",
          "Alpha Plus Opt Hybrid CVT",
          "Alpha Plus Opt Hybrid CVT DT",
          "Delta",
          "Delta AT",
          "Delta Plus Hybrid CVT",
          "Sigma",
          "VXi",
          "VXi (O)",
          "Zeta",
          "Zeta AT",
          "Zeta AT DT",
          "Zeta DT",
          "Zeta Opt",
          "Zeta Opt AT",
          "Zeta Opt AT DT",
          "Zeta Opt DT",
          "Zeta Plus Hybrid CVT",
          "Zeta Plus Hybrid CVT DT",
          "Zeta Plus Opt Hybrid CVT",
          "Zeta Plus Opt Hybrid CVT DT"
        ],
        "Petrol Hybrid": [
          "Alpha",
          "Delta",
          "Zeta"
        ]
      },
      "basePrice": 1077000,
      "variantPrices": {
        "CNG": {
          "Zeta DT": {
            "exShowroomPrice": 1475000,
            "engineCC": 1462
          },
          "Zeta": {
            "exShowroomPrice": 1460000,
            "engineCC": 1462
          },
          "Delta": {
            "exShowroomPrice": 1300000,
            "engineCC": 1462
          }
        },
        "Petrol": {
          "Alpha": {
            "exShowroomPrice": 1525000,
            "engineCC": 1462
          },
          "Delta AT": {
            "exShowroomPrice": 1350000,
            "engineCC": 1462
          },
          "Zeta Opt DT": {
            "exShowroomPrice": 1404000,
            "engineCC": 1462
          },
          "Alpha Plus Hybrid CVT": {
            "exShowroomPrice": 1955000,
            "engineCC": 1490
          },
          "Alpha Plus Hybrid CVT DT": {
            "exShowroomPrice": 1971000,
            "engineCC": 1490
          },
          "Zeta Opt AT DT": {
            "exShowroomPrice": 1545000,
            "engineCC": 1462
          },
          "Alpha DT": {
            "exShowroomPrice": 1540000,
            "engineCC": 1462
          },
          "Delta": {
            "exShowroomPrice": 1215000,
            "engineCC": 1462
          },
          "Alpha Opt AT DT": {
            "exShowroomPrice": 1689000,
            "engineCC": 1462
          },
          "Zeta DT": {
            "exShowroomPrice": 1390000,
            "engineCC": 1462
          },
          "Zeta Plus Opt Hybrid CVT": {
            "exShowroomPrice": 1855000,
            "engineCC": 1490
          },
          "Zeta Opt": {
            "exShowroomPrice": 1389000,
            "engineCC": 1462
          },
          "Zeta Plus Hybrid CVT DT": {
            "exShowroomPrice": 1812000,
            "engineCC": 1490
          },
          "Delta Plus Hybrid CVT": {
            "exShowroomPrice": 1668000,
            "engineCC": 1490
          },
          "Alpha AWD AT DT": {
            "exShowroomPrice": 1820000,
            "engineCC": 1462
          },
          "Alpha Opt": {
            "exShowroomPrice": 1539000,
            "engineCC": 1462
          },
          "Alpha AT": {
            "exShowroomPrice": 1660000,
            "engineCC": 1462
          },
          "Alpha AT DT": {
            "exShowroomPrice": 1675000,
            "engineCC": 1462
          },
          "Zeta AT DT": {
            "exShowroomPrice": 1525000,
            "engineCC": 1462
          },
          "Zeta AT": {
            "exShowroomPrice": 1510000,
            "engineCC": 1462
          },
          "Sigma": {
            "exShowroomPrice": 1077000,
            "engineCC": 1462
          },
          "Alpha AWD AT": {
            "exShowroomPrice": 1805000,
            "engineCC": 1462
          },
          "Alpha AWD Opt AT DT": {
            "exShowroomPrice": 1878000,
            "engineCC": 1462
          },
          "Zeta": {
            "exShowroomPrice": 1375000,
            "engineCC": 1462
          },
          "Alpha AWD Opt AT": {
            "exShowroomPrice": 1863000,
            "engineCC": 1462
          },
          "Alpha Plus Opt Hybrid CVT DT": {
            "exShowroomPrice": 1977000,
            "engineCC": 1490
          },
          "Alpha Plus Opt Hybrid CVT": {
            "exShowroomPrice": 1962000,
            "engineCC": 1490
          },
          "Alpha Opt DT": {
            "exShowroomPrice": 1554000,
            "engineCC": 1462
          },
          "Alpha Opt AT": {
            "exShowroomPrice": 1674000,
            "engineCC": 1462
          },
          "Zeta Plus Hybrid CVT": {
            "exShowroomPrice": 1797000,
            "engineCC": 1490
          },
          "Zeta Plus Opt Hybrid CVT DT": {
            "exShowroomPrice": 1871000,
            "engineCC": 1490
          },
          "Zeta Opt AT": {
            "exShowroomPrice": 1524000,
            "engineCC": 1462
          }
        },
        "Petrol Hybrid": {}
      }
    },
    "Invicto": {
      "bodyType": "MPV",
      "fuelTypes": {
        "Petrol": [
          "Alpha Plus 7Str",
          "Zeta Plus 8Str",
          "Zeta Plus 7Str"
        ],
        "Petrol Hybrid": [
          "Alpha+",
          "Zeta+"
        ]
      },
      "basePrice": 2497000,
      "variantPrices": {
        "Petrol": {
          "Alpha Plus 7Str": {
            "exShowroomPrice": 2870000,
            "engineCC": 1987
          },
          "Zeta Plus 8Str": {
            "exShowroomPrice": 2537000,
            "engineCC": 1987
          },
          "Zeta Plus 7Str": {
            "exShowroomPrice": 2497000,
            "engineCC": 1987
          }
        },
        "Petrol Hybrid": {}
      }
    },
    "Jimny": {
      "bodyType": "SUV",
      "fuelTypes": {
        "Petrol": [
          "Alpha",
          "Alpha AT",
          "Alpha Dual Tone",
          "Alpha Dual Tone AT",
          "Zeta",
          "Zeta AT"
        ]
      },
      "basePrice": 1254000,
      "variantPrices": {
        "Petrol": {
          "Zeta AT": {
            "exShowroomPrice": 1360000,
            "engineCC": 1462
          },
          "Alpha Dual Tone AT": {
            "exShowroomPrice": 1467000,
            "engineCC": 1462
          },
          "Zeta": {
            "exShowroomPrice": 1254000,
            "engineCC": 1462
          },
          "Alpha AT": {
            "exShowroomPrice": 1452000,
            "engineCC": 1462
          },
          "Alpha": {
            "exShowroomPrice": 1346000,
            "engineCC": 1462
          },
          "Alpha Dual Tone": {
            "exShowroomPrice": 1361000,
            "engineCC": 1462
          }
        }
      }
    },
    "S-Presso": {
      "bodyType": "Hatchback",
      "fuelTypes": {
        "CNG": [
          "CNG variant",
          "LXI (O)",
          "VXI (O)"
        ],
        "Petrol": [
          "LXi",
          "LXi (O)",
          "Std",
          "STD (O)",
          "VXi",
          "VXI (O)",
          "VXi (O) AT",
          "VXi Plus (O)",
          "VXi Plus (O) AT",
          "VXi+"
        ]
      },
      "basePrice": 350000,
      "variantPrices": {
        "CNG": {
          "LXI (O)": {
            "exShowroomPrice": 464000,
            "engineCC": 998
          },
          "VXI (O)": {
            "exShowroomPrice": 514000,
            "engineCC": 998
          }
        },
        "Petrol": {
          "VXi Plus (O)": {
            "exShowroomPrice": 482000,
            "engineCC": 998
          },
          "LXi (O)": {
            "exShowroomPrice": 382000,
            "engineCC": 998
          },
          "VXi Plus (O) AT": {
            "exShowroomPrice": 527000,
            "engineCC": 998
          },
          "VXi (O) AT": {
            "exShowroomPrice": 477000,
            "engineCC": 998
          },
          "STD (O)": {
            "exShowroomPrice": 350000,
            "engineCC": 998
          },
          "VXI (O)": {
            "exShowroomPrice": 432000,
            "engineCC": 998
          }
        }
      }
    },
    "Swift": {
      "bodyType": "Hatchback",
      "fuelTypes": {
        "Petrol": [
          "LXi",
          "VXi",
          "VXi AMT",
          "VXi Opt",
          "VXi Opt AMT",
          "ZXi",
          "ZXi AMT",
          "ZXi Plus",
          "ZXi Plus AMT",
          "ZXi Plus AMT DT",
          "ZXi Plus DT",
          "ZXi+"
        ],
        "CNG": [
          "CNG variant",
          "VXi",
          "VXi Opt",
          "ZXi"
        ],
        "Diesel": [
          "LDi",
          "VDi",
          "ZDi",
          "ZDi+"
        ]
      },
      "basePrice": 584000,
      "variantPrices": {
        "Petrol": {
          "ZXi Plus AMT DT": {
            "exShowroomPrice": 889000,
            "engineCC": 1197
          },
          "VXi Opt": {
            "exShowroomPrice": 694000,
            "engineCC": 1197
          },
          "VXi": {
            "exShowroomPrice": 668000,
            "engineCC": 1197
          },
          "LXi": {
            "exShowroomPrice": 584000,
            "engineCC": 1197
          },
          "ZXi AMT": {
            "exShowroomPrice": 807000,
            "engineCC": 1197
          },
          "ZXi": {
            "exShowroomPrice": 762000,
            "engineCC": 1197
          },
          "ZXi Plus AMT": {
            "exShowroomPrice": 874000,
            "engineCC": 1197
          },
          "ZXi Plus DT": {
            "exShowroomPrice": 844000,
            "engineCC": 1197
          },
          "VXi AMT": {
            "exShowroomPrice": 713000,
            "engineCC": 1197
          },
          "ZXi Plus": {
            "exShowroomPrice": 829000,
            "engineCC": 1197
          },
          "VXi Opt AMT": {
            "exShowroomPrice": 739000,
            "engineCC": 1197
          },
          "ZXi+": {
            "exShowroomPrice": 762000,
            "engineCC": 1197,
            "source": "existing_variant_price_alias"
          }
        },
        "CNG": {
          "VXi": {
            "exShowroomPrice": 757000,
            "engineCC": 1197
          },
          "VXi Opt": {
            "exShowroomPrice": 783000,
            "engineCC": 1197
          },
          "ZXi": {
            "exShowroomPrice": 851000,
            "engineCC": 1197
          }
        },
        "Diesel": {}
      }
    },
    "Victoris": {
      "bodyType": "Car",
      "fuelTypes": {
        "Petrol": [
          "ZXI (O) Strong Hybrid DT",
          "ZXI Plus AWD AT DT",
          "ZXI (O) AT",
          "ZXI Plus (O) AT",
          "ZXI Plus (O)",
          "ZXI (O) AT DT",
          "ZXI Plus (O) Strong Hybrid DT",
          "ZXI AT",
          "ZXI Plus (O) AWD AT DT",
          "ZXI Plus",
          "ZXI Plus (O) AT DT",
          "ZXI Strong Hybrid",
          "ZXI Plus AT AWD",
          "ZXI Plus (O) AT AWD",
          "VXI Strong Hybrid",
          "ZXI Plus AT",
          "ZXI Plus (O) Strong Hybrid",
          "ZXI Plus (O) DT",
          "ZXI Plus Strong Hybrid",
          "ZXI DT",
          "VXI AT",
          "VXI",
          "ZXI Plus Strong Hybrid DT",
          "ZXI",
          "ZXI AT DT",
          "ZXI (O)",
          "ZXI (O) DT",
          "ZXI Plus DT",
          "ZXI Plus AT DT",
          "ZXI Strong Hybrid DT",
          "ZXI (O) Strong Hybrid",
          "LXI"
        ],
        "CNG": [
          "ZXI DT",
          "ZXI",
          "LXI",
          "VXI"
        ]
      },
      "basePrice": 1050000,
      "variantPrices": {
        "Petrol": {
          "ZXI (O) Strong Hybrid DT": {
            "exShowroomPrice": 1859000,
            "engineCC": 1490
          },
          "ZXI Plus AWD AT DT": {
            "exShowroomPrice": 1879000,
            "engineCC": 1462
          },
          "ZXI (O) AT": {
            "exShowroomPrice": 1525000,
            "engineCC": 1462
          },
          "ZXI Plus (O) AT": {
            "exShowroomPrice": 1738000,
            "engineCC": 1462
          },
          "ZXI Plus (O)": {
            "exShowroomPrice": 1548000,
            "engineCC": 1462
          },
          "ZXI (O) AT DT": {
            "exShowroomPrice": 1540000,
            "engineCC": 1462
          },
          "ZXI Plus (O) Strong Hybrid DT": {
            "exShowroomPrice": 1999000,
            "engineCC": 1490
          },
          "ZXI AT": {
            "exShowroomPrice": 1518000,
            "engineCC": 1462
          },
          "ZXI Plus (O) AWD AT DT": {
            "exShowroomPrice": 1937000,
            "engineCC": 1462
          },
          "ZXI Plus": {
            "exShowroomPrice": 1529000,
            "engineCC": 1462
          },
          "ZXI Plus (O) AT DT": {
            "exShowroomPrice": 1753000,
            "engineCC": 1462
          },
          "ZXI Strong Hybrid": {
            "exShowroomPrice": 1785000,
            "engineCC": 1490
          },
          "ZXI Plus AT AWD": {
            "exShowroomPrice": 1864000,
            "engineCC": 1462
          },
          "ZXI Plus (O) AT AWD": {
            "exShowroomPrice": 1922000,
            "engineCC": 1462
          },
          "VXI Strong Hybrid": {
            "exShowroomPrice": 1643000,
            "engineCC": 1490
          },
          "ZXI Plus AT": {
            "exShowroomPrice": 1719000,
            "engineCC": 1462
          },
          "ZXI Plus (O) Strong Hybrid": {
            "exShowroomPrice": 1999000,
            "engineCC": 1490
          },
          "ZXI Plus (O) DT": {
            "exShowroomPrice": 1563000,
            "engineCC": 1462
          },
          "ZXI Plus Strong Hybrid": {
            "exShowroomPrice": 1952000,
            "engineCC": 1490
          },
          "ZXI DT": {
            "exShowroomPrice": 1377000,
            "engineCC": 1462
          },
          "VXI AT": {
            "exShowroomPrice": 1341000,
            "engineCC": 1462
          },
          "VXI": {
            "exShowroomPrice": 1185000,
            "engineCC": 1462
          },
          "ZXI Plus Strong Hybrid DT": {
            "exShowroomPrice": 1967000,
            "engineCC": 1490
          },
          "ZXI": {
            "exShowroomPrice": 1362000,
            "engineCC": 1462
          },
          "ZXI AT DT": {
            "exShowroomPrice": 1533000,
            "engineCC": 1462
          },
          "ZXI (O)": {
            "exShowroomPrice": 1369000,
            "engineCC": 1462
          },
          "ZXI (O) DT": {
            "exShowroomPrice": 1384000,
            "engineCC": 1462
          },
          "ZXI Plus DT": {
            "exShowroomPrice": 1544000,
            "engineCC": 1462
          },
          "ZXI Plus AT DT": {
            "exShowroomPrice": 1734000,
            "engineCC": 1462
          },
          "ZXI Strong Hybrid DT": {
            "exShowroomPrice": 1800000,
            "engineCC": 1490
          },
          "ZXI (O) Strong Hybrid": {
            "exShowroomPrice": 1844000,
            "engineCC": 1490
          },
          "LXI": {
            "exShowroomPrice": 1050000,
            "engineCC": 1462
          }
        },
        "CNG": {
          "ZXI DT": {
            "exShowroomPrice": 1482000,
            "engineCC": 1462
          },
          "ZXI": {
            "exShowroomPrice": 1467000,
            "engineCC": 1462
          },
          "LXI": {
            "exShowroomPrice": 1155000,
            "engineCC": 1462
          },
          "VXI": {
            "exShowroomPrice": 1290000,
            "engineCC": 1462
          }
        }
      }
    },
    "Wagon R": {
      "bodyType": "Hatchback",
      "fuelTypes": {
        "Petrol": [
          "ZXI AT",
          "VXI AT",
          "ZXI Plus",
          "LXI",
          "Flex Fuel",
          "ZXI",
          "ZXI Plus AT",
          "ZXI Plus AT Dual Tone",
          "ZXI Plus Dual Tone",
          "VXI"
        ],
        "CNG": [
          "LXI",
          "VXI"
        ]
      },
      "basePrice": 499000,
      "variantPrices": {
        "Petrol": {
          "ZXI AT": {
            "exShowroomPrice": 643000,
            "engineCC": 1197
          },
          "VXI AT": {
            "exShowroomPrice": 599000,
            "engineCC": 998
          },
          "ZXI Plus": {
            "exShowroomPrice": 641000,
            "engineCC": 1197
          },
          "LXI": {
            "exShowroomPrice": 499000,
            "engineCC": 998
          },
          "Flex Fuel": {
            "exShowroomPrice": 724000,
            "engineCC": 1197
          },
          "ZXI": {
            "exShowroomPrice": 598000,
            "engineCC": 1197
          },
          "ZXI Plus AT": {
            "exShowroomPrice": 686000,
            "engineCC": 1197
          },
          "ZXI Plus AT Dual Tone": {
            "exShowroomPrice": 697000,
            "engineCC": 1197
          },
          "ZXI Plus Dual Tone": {
            "exShowroomPrice": 652000,
            "engineCC": 1197
          },
          "VXI": {
            "exShowroomPrice": 554000,
            "engineCC": 998
          }
        },
        "CNG": {
          "LXI": {
            "exShowroomPrice": 594000,
            "engineCC": 998
          },
          "VXI": {
            "exShowroomPrice": 649000,
            "engineCC": 998
          }
        }
      }
    },
    "Wagon R tour": {
      "bodyType": "Hatchback",
      "fuelTypes": {
        "CNG": [
          "H3"
        ],
        "Petrol": [
          "H3 PETROL"
        ]
      },
      "basePrice": 499000,
      "variantPrices": {
        "CNG": {
          "H3": {
            "exShowroomPrice": 589000,
            "engineCC": 998
          }
        },
        "Petrol": {
          "H3 PETROL": {
            "exShowroomPrice": 499000,
            "engineCC": 998
          }
        }
      }
    },
    "XL6": {
      "bodyType": "MPV",
      "fuelTypes": {
        "Petrol": [
          "Alpha",
          "Alpha AT",
          "Alpha Plus",
          "Alpha Plus AT",
          "Alpha Plus AT Dual Tone",
          "Alpha Plus Dual Tone",
          "Zeta",
          "Zeta AT"
        ],
        "CNG": [
          "Zeta"
        ],
        "Petrol Hybrid": [
          "Alpha",
          "Zeta"
        ]
      },
      "basePrice": 1162000,
      "variantPrices": {
        "Petrol": {
          "Alpha Plus": {
            "exShowroomPrice": 1307000,
            "engineCC": 1462
          },
          "Alpha Plus AT Dual Tone": {
            "exShowroomPrice": 1457000,
            "engineCC": 1462
          },
          "Zeta": {
            "exShowroomPrice": 1162000,
            "engineCC": 1462
          },
          "Alpha Plus AT": {
            "exShowroomPrice": 1442000,
            "engineCC": 1462
          },
          "Alpha AT": {
            "exShowroomPrice": 1394000,
            "engineCC": 1462
          },
          "Alpha": {
            "exShowroomPrice": 1259000,
            "engineCC": 1462
          },
          "Alpha Plus Dual Tone": {
            "exShowroomPrice": 1322000,
            "engineCC": 1462
          },
          "Zeta AT": {
            "exShowroomPrice": 1297000,
            "engineCC": 1462
          }
        },
        "CNG": {
          "Zeta": {
            "exShowroomPrice": 1261000,
            "engineCC": 1462
          }
        },
        "Petrol Hybrid": {}
      }
    },
    "e Vitara": {
      "bodyType": "SUV (Electric)",
      "fuelTypes": {
        "Electric": [
          "Alpha",
          "Alpha Dual Tone",
          "Delta",
          "Long range",
          "Standard range",
          "Zeta"
        ]
      },
      "basePrice": 1619000,
      "variantPrices": {
        "Electric": {
          "Delta": {
            "exShowroomPrice": 1619000
          },
          "Zeta": {
            "exShowroomPrice": 1794000
          },
          "Alpha Dual Tone": {
            "exShowroomPrice": 2021000
          },
          "Alpha": {
            "exShowroomPrice": 1999000
          }
        }
      }
    }
  },
  "Maserati": {
    "GranCabrio": {
      "bodyType": "Car",
      "fuelTypes": {
        "Diesel": [
          "Gran Cabrio Sport",
          "Gran Cabrio MC"
        ],
        "Petrol": [
          "4.7 V8",
          "Gran Cabrio 4.7 MC"
        ]
      },
      "basePrice": 24600000,
      "variantPrices": {
        "Diesel": {
          "Gran Cabrio Sport": {
            "exShowroomPrice": 2,
            "engineCC": 4691
          },
          "Gran Cabrio MC": {
            "exShowroomPrice": 3,
            "engineCC": 4691
          }
        },
        "Petrol": {
          "4.7 V8": {
            "exShowroomPrice": 2,
            "engineCC": 4691
          },
          "Gran Cabrio 4.7 MC": {
            "exShowroomPrice": 3,
            "engineCC": 4691
          }
        }
      }
    },
    "GranTurismo": {
      "bodyType": "Car",
      "fuelTypes": {
        "Petrol": [
          "Gran Turismo 4.7 V8",
          "Gran Turismo 4.7 MC"
        ],
        "Diesel": [
          "Gran Turismo Sport"
        ]
      },
      "basePrice": 22500000,
      "variantPrices": {
        "Petrol": {
          "Gran Turismo 4.7 V8": {
            "exShowroomPrice": 2,
            "engineCC": 4691
          },
          "Gran Turismo 4.7 MC": {
            "exShowroomPrice": 3,
            "engineCC": 4691
          }
        },
        "Diesel": {
          "Gran Turismo Sport": {
            "exShowroomPrice": 2,
            "engineCC": 4691
          }
        }
      }
    },
    "Grecale": {
      "bodyType": "Car",
      "fuelTypes": {
        "Petrol": [
          "Trofeo",
          "GT",
          "Modena"
        ]
      },
      "basePrice": 13100000,
      "variantPrices": {
        "Petrol": {
          "Trofeo": {
            "exShowroomPrice": 2,
            "engineCC": 3000
          },
          "GT": {
            "exShowroomPrice": 1,
            "engineCC": 1995
          },
          "Modena": {
            "exShowroomPrice": 2,
            "engineCC": 1995
          }
        }
      }
    },
    "Levante": {
      "bodyType": "SUV",
      "fuelTypes": {
        "Petrol": [
          "430 GranLusso",
          "430 GranSport",
          "350 GranLusso",
          "350 GranSport"
        ],
        "Diesel": [
          "GranSport",
          "GranLusso"
        ]
      },
      "basePrice": 14900000,
      "variantPrices": {
        "Petrol": {
          "430 GranLusso": {
            "exShowroomPrice": 2,
            "engineCC": 2979
          },
          "430 GranSport": {
            "exShowroomPrice": 2,
            "engineCC": 2979
          },
          "350 GranLusso": {
            "exShowroomPrice": 2,
            "engineCC": 2979
          },
          "350 GranSport": {
            "exShowroomPrice": 1,
            "engineCC": 2979
          }
        },
        "Diesel": {
          "GranSport": {
            "exShowroomPrice": 2,
            "engineCC": 2987
          },
          "GranLusso": {
            "exShowroomPrice": 2,
            "engineCC": 2987
          }
        }
      }
    },
    "Quattroporte": {
      "bodyType": "Sedan",
      "fuelTypes": {
        "Petrol": [
          "350 GranLusso",
          "430 GranSport",
          "430 GranLusso",
          "350 GranSport"
        ],
        "Diesel": [
          "GranLusso",
          "GranSport"
        ]
      },
      "basePrice": 17100000,
      "variantPrices": {
        "Petrol": {
          "350 GranLusso": {
            "exShowroomPrice": 2,
            "engineCC": 2979
          },
          "430 GranSport": {
            "exShowroomPrice": 2,
            "engineCC": 2979
          },
          "430 GranLusso": {
            "exShowroomPrice": 2,
            "engineCC": 2979
          },
          "350 GranSport": {
            "exShowroomPrice": 2,
            "engineCC": 2979
          }
        },
        "Diesel": {
          "GranLusso": {
            "exShowroomPrice": 2,
            "engineCC": 2999
          },
          "GranSport": {
            "exShowroomPrice": 2,
            "engineCC": 2999
          }
        }
      }
    }
  },
  "Mclaren": {
    "GT": {
      "bodyType": "Car",
      "fuelTypes": {
        "Petrol": [
          "V8"
        ]
      },
      "basePrice": 45000000,
      "variantPrices": {
        "Petrol": {
          "V8": {
            "exShowroomPrice": 4,
            "engineCC": 3994
          }
        }
      }
    }
  },
  "Mercedes-Benz": {
    "AMG A 45 S": {
      "bodyType": "Car",
      "fuelTypes": {
        "Petrol": [
          "4MATIC Plus",
          "Aero Track Edition"
        ]
      },
      "basePrice": 8700000,
      "variantPrices": {
        "Petrol": {
          "4MATIC Plus": {
            "exShowroomPrice": 9480000,
            "engineCC": 1991
          },
          "Aero Track Edition": {
            "exShowroomPrice": 8700000,
            "engineCC": 1991
          }
        }
      }
    },
    "AMG C 63": {
      "bodyType": "Car",
      "fuelTypes": {
        "Petrol": [
          "S E-Performance"
        ]
      },
      "basePrice": 19100000,
      "variantPrices": {
        "Petrol": {
          "S E-Performance": {
            "exShowroomPrice": 2,
            "engineCC": 1991
          }
        }
      }
    },
    "AMG C43": {
      "bodyType": "Car",
      "fuelTypes": {
        "Petrol": [
          "4Matic"
        ]
      },
      "basePrice": 9405000,
      "variantPrices": {
        "Petrol": {
          "4Matic": {
            "exShowroomPrice": 9405000,
            "engineCC": 1991
          }
        }
      }
    },
    "AMG CLE 53": {
      "bodyType": "Car",
      "fuelTypes": {
        "Petrol": [
          "4Matic"
        ]
      },
      "basePrice": 13200000,
      "variantPrices": {
        "Petrol": {
          "4Matic": {
            "exShowroomPrice": 1,
            "engineCC": 2999
          }
        }
      }
    },
    "AMG E 53": {
      "bodyType": "Car",
      "fuelTypes": {
        "Petrol": [
          "Racing Edition",
          "Performance Edition"
        ]
      },
      "basePrice": 14500000,
      "variantPrices": {
        "Petrol": {
          "Racing Edition": {
            "exShowroomPrice": 1,
            "engineCC": 2999
          },
          "Performance Edition": {
            "exShowroomPrice": 1,
            "engineCC": 2999
          }
        }
      }
    },
    "AMG EQS": {
      "bodyType": "Car",
      "fuelTypes": {
        "Electric": [
          "53 4Matic Plus"
        ]
      },
      "basePrice": 24500000,
      "variantPrices": {
        "Electric": {
          "53 4Matic Plus": {
            "exShowroomPrice": 2
          }
        }
      }
    },
    "AMG GLC 43": {
      "bodyType": "SUV",
      "fuelTypes": {
        "Petrol": [
          "4Matic"
        ]
      },
      "basePrice": 9985000,
      "variantPrices": {
        "Petrol": {
          "4Matic": {
            "exShowroomPrice": 9985000,
            "engineCC": 1991
          }
        }
      }
    },
    "AMG GLE 53": {
      "bodyType": "SUV",
      "fuelTypes": {
        "Petrol": [
          "Coupe",
          "Coupe Performance Edition"
        ]
      },
      "basePrice": 15200000,
      "variantPrices": {
        "Petrol": {
          "Coupe": {
            "exShowroomPrice": 2,
            "engineCC": 2999
          },
          "Coupe Performance Edition": {
            "exShowroomPrice": 2,
            "engineCC": 2999
          }
        }
      }
    },
    "AMG GT 4 Door Coupe": {
      "bodyType": "Coupe/Convertible",
      "fuelTypes": {
        "Petrol": [
          "63 S E Performance"
        ]
      },
      "basePrice": 32700000,
      "variantPrices": {
        "Petrol": {
          "63 S E Performance": {
            "exShowroomPrice": 3,
            "engineCC": 3982
          }
        }
      }
    },
    "AMG GT Coupe": {
      "bodyType": "Coupe/Convertible",
      "fuelTypes": {
        "Petrol": [
          "63 4MATIC Plus",
          "63 Pro 4MATIC Plus"
        ]
      },
      "basePrice": 30000000,
      "variantPrices": {
        "Petrol": {
          "63 4MATIC Plus": {
            "exShowroomPrice": 3,
            "engineCC": 3982
          },
          "63 Pro 4MATIC Plus": {
            "exShowroomPrice": 4,
            "engineCC": 3982
          }
        }
      }
    },
    "AMG S 63": {
      "bodyType": "Car",
      "fuelTypes": {
        "Petrol": [
          "E Performance",
          "E Performance Edition 1"
        ]
      },
      "basePrice": 32700000,
      "variantPrices": {
        "Petrol": {
          "E Performance": {
            "exShowroomPrice": 3,
            "engineCC": 3982
          },
          "E Performance Edition 1": {
            "exShowroomPrice": 4,
            "engineCC": 3982
          }
        }
      }
    },
    "AMG SL": {
      "bodyType": "Car",
      "fuelTypes": {
        "Petrol": [
          "55 4Matic Plus Roadster"
        ]
      },
      "basePrice": 23400000,
      "variantPrices": {
        "Petrol": {
          "55 4Matic Plus Roadster": {
            "exShowroomPrice": 2,
            "engineCC": 3982
          }
        }
      }
    },
    "C-Class": {
      "bodyType": "Sedan",
      "fuelTypes": {
        "Petrol": [
          "C 200",
          "C 300",
          "Celebration Edition"
        ],
        "Diesel": [
          "C 220d"
        ]
      },
      "basePrice": 5990000,
      "variantPrices": {
        "Petrol": {
          "C 200": {
            "exShowroomPrice": 5990000,
            "engineCC": 1496
          },
          "C 300": {
            "exShowroomPrice": 6560000,
            "engineCC": 1999
          },
          "Celebration Edition": {
            "exShowroomPrice": 6240000,
            "engineCC": 1999
          }
        },
        "Diesel": {
          "C 220d": {
            "exShowroomPrice": 5990000,
            "engineCC": 1993
          }
        }
      }
    },
    "CLA Electric": {
      "bodyType": "Electric",
      "fuelTypes": {
        "Electric": [
          "CLA 250 Plus",
          "CLA CLA 250 Plus Launch Edition",
          "CLA 200"
        ]
      },
      "basePrice": 5650000,
      "variantPrices": {
        "Electric": {
          "CLA 250 Plus": {
            "exShowroomPrice": 5900000
          },
          "CLA CLA 250 Plus Launch Edition": {
            "exShowroomPrice": 6400000
          },
          "CLA 200": {
            "exShowroomPrice": 5650000
          }
        }
      }
    },
    "CLE Cabriolet": {
      "bodyType": "Coupe/Convertible",
      "fuelTypes": {
        "Petrol": [
          "300 4Matic AMG Line"
        ]
      },
      "basePrice": 11500000,
      "variantPrices": {
        "Petrol": {
          "300 4Matic AMG Line": {
            "exShowroomPrice": 1,
            "engineCC": 1999
          }
        }
      }
    },
    "E-Class": {
      "bodyType": "Sedan",
      "fuelTypes": {
        "Petrol": [
          "E 200",
          "Celebration Edition",
          "E 450"
        ],
        "Diesel": [
          "E 220d"
        ]
      },
      "basePrice": 8000000,
      "variantPrices": {
        "Petrol": {
          "E 200": {
            "exShowroomPrice": 8000000,
            "engineCC": 1999
          },
          "Celebration Edition": {
            "exShowroomPrice": 8270000,
            "engineCC": 2999
          },
          "E 450": {
            "exShowroomPrice": 9350000,
            "engineCC": 2999
          }
        },
        "Diesel": {
          "E 220d": {
            "exShowroomPrice": 8200000,
            "engineCC": 1993
          }
        }
      }
    },
    "EQS": {
      "bodyType": "Car",
      "fuelTypes": {
        "Electric": [
          "580 4MATIC Celebration Edition",
          "580 4Matic"
        ]
      },
      "basePrice": 13000000,
      "variantPrices": {
        "Electric": {
          "580 4MATIC Celebration Edition": {
            "exShowroomPrice": 1
          },
          "580 4Matic": {
            "exShowroomPrice": 1
          }
        }
      }
    },
    "EQS SUV": {
      "bodyType": "SUV",
      "fuelTypes": {
        "Electric": [
          "580 Celebration Edition",
          "450 4Matic",
          "580 4Matic",
          "450 Celebration Edition"
        ]
      },
      "basePrice": 13300000,
      "variantPrices": {
        "Electric": {
          "580 Celebration Edition": {
            "exShowroomPrice": 1
          },
          "450 4Matic": {
            "exShowroomPrice": 1
          },
          "580 4Matic": {
            "exShowroomPrice": 1
          },
          "450 Celebration Edition": {
            "exShowroomPrice": 1
          }
        }
      }
    },
    "G-Class": {
      "bodyType": "Car",
      "fuelTypes": {
        "Petrol": [
          "AMG G 63 Collector's Edition",
          "AMG G 63"
        ],
        "Diesel": [
          "400d Adventure Edition",
          "400d AMG Line",
          "450d Mild Hybrid"
        ]
      },
      "basePrice": 25500000,
      "variantPrices": {
        "Petrol": {
          "AMG G 63 Collector's Edition": {
            "exShowroomPrice": 4,
            "engineCC": 3982
          },
          "AMG G 63": {
            "exShowroomPrice": 4,
            "engineCC": 3982
          }
        },
        "Diesel": {
          "400d Adventure Edition": {
            "exShowroomPrice": 3,
            "engineCC": 2925
          },
          "400d AMG Line": {
            "exShowroomPrice": 3,
            "engineCC": 2925
          },
          "450d Mild Hybrid": {
            "exShowroomPrice": 3,
            "engineCC": 2989
          }
        }
      }
    },
    "G-Class Electric": {
      "bodyType": "Electric",
      "fuelTypes": {
        "Electric": [
          "G-Class G 580"
        ]
      },
      "basePrice": 31000000,
      "variantPrices": {
        "Electric": {
          "G-Class G 580": {
            "exShowroomPrice": 3
          }
        }
      }
    },
    "GLA": {
      "bodyType": "SUV",
      "fuelTypes": {
        "Petrol": [
          "200"
        ],
        "Diesel": [
          "220d 4MATIC",
          "220d 4MATIC AMG Line"
        ]
      },
      "basePrice": 5180000,
      "variantPrices": {
        "Petrol": {
          "200": {
            "exShowroomPrice": 5180000,
            "engineCC": 1332
          }
        },
        "Diesel": {
          "220d 4MATIC": {
            "exShowroomPrice": 5300000,
            "engineCC": 1950
          },
          "220d 4MATIC AMG Line": {
            "exShowroomPrice": 5500000,
            "engineCC": 1950
          }
        }
      }
    },
    "GLC": {
      "bodyType": "SUV",
      "fuelTypes": {
        "Diesel": [
          "220d"
        ],
        "Petrol": [
          "300"
        ]
      },
      "basePrice": 7700000,
      "variantPrices": {
        "Diesel": {
          "220d": {
            "exShowroomPrice": 7700000,
            "engineCC": 1993
          }
        },
        "Petrol": {
          "300": {
            "exShowroomPrice": 7700000,
            "engineCC": 1999
          }
        }
      }
    },
    "GLE": {
      "bodyType": "SUV",
      "fuelTypes": {
        "Diesel": [
          "450d 4Matic",
          "300d 4Matic AMG Line",
          "300d Night Edition"
        ],
        "Petrol": [
          "450 Night Edition",
          "450 4Matic"
        ]
      },
      "basePrice": 10000000,
      "variantPrices": {
        "Diesel": {
          "450d 4Matic": {
            "exShowroomPrice": 1,
            "engineCC": 2989
          },
          "300d 4Matic AMG Line": {
            "exShowroomPrice": 1,
            "engineCC": 1993
          },
          "300d Night Edition": {
            "exShowroomPrice": 1,
            "engineCC": 1950
          }
        },
        "Petrol": {
          "450 Night Edition": {
            "exShowroomPrice": 1,
            "engineCC": 2999
          },
          "450 4Matic": {
            "exShowroomPrice": 1,
            "engineCC": 2999
          }
        }
      }
    },
    "GLS": {
      "bodyType": "SUV",
      "fuelTypes": {
        "Diesel": [
          "450d 4MATIC AMG Line",
          "450d Night Edition",
          "450d 4MATIC"
        ],
        "Petrol": [
          "450 4MATIC",
          "450 4MATIC AMG Line",
          "450 Night Edition"
        ]
      },
      "basePrice": 13200000,
      "variantPrices": {
        "Diesel": {
          "450d 4MATIC AMG Line": {
            "exShowroomPrice": 1,
            "engineCC": 2925
          },
          "450d Night Edition": {
            "exShowroomPrice": 1,
            "engineCC": 2989
          },
          "450d 4MATIC": {
            "exShowroomPrice": 1,
            "engineCC": 2925
          }
        },
        "Petrol": {
          "450 4MATIC": {
            "exShowroomPrice": 1,
            "engineCC": 2999
          },
          "450 4MATIC AMG Line": {
            "exShowroomPrice": 1,
            "engineCC": 2999
          },
          "450 Night Edition": {
            "exShowroomPrice": 1,
            "engineCC": 2999
          }
        }
      }
    },
    "Maybach EQS SUV": {
      "bodyType": "SUV",
      "fuelTypes": {
        "Electric": [
          "680",
          "Night Series"
        ]
      },
      "basePrice": 24000000,
      "variantPrices": {
        "Electric": {
          "680": {
            "exShowroomPrice": 2
          },
          "Night Series": {
            "exShowroomPrice": 3
          }
        }
      }
    },
    "Maybach GLS": {
      "bodyType": "SUV",
      "fuelTypes": {
        "Petrol": [
          "600 Celebration Edition",
          "600 Night Series",
          "600 4MATIC"
        ]
      },
      "basePrice": 27500000,
      "variantPrices": {
        "Petrol": {
          "600 Celebration Edition": {
            "exShowroomPrice": 4,
            "engineCC": 3982
          },
          "600 Night Series": {
            "exShowroomPrice": 3,
            "engineCC": 3982
          },
          "600 4MATIC": {
            "exShowroomPrice": 3,
            "engineCC": 3982
          }
        }
      }
    },
    "Maybach S-Class": {
      "bodyType": "Sedan",
      "fuelTypes": {
        "Petrol": [
          "S680",
          "S580"
        ]
      },
      "basePrice": 28800000,
      "variantPrices": {
        "Petrol": {
          "S680": {
            "exShowroomPrice": 3,
            "engineCC": 5980
          },
          "S580": {
            "exShowroomPrice": 3,
            "engineCC": 3982
          }
        }
      }
    },
    "Maybach SL 680": {
      "bodyType": "Car",
      "fuelTypes": {
        "Petrol": [
          "Monogram Series"
        ]
      },
      "basePrice": 43000000,
      "variantPrices": {
        "Petrol": {
          "Monogram Series": {
            "exShowroomPrice": 4,
            "engineCC": 3982
          }
        }
      }
    },
    "S-Class": {
      "bodyType": "Sedan",
      "fuelTypes": {
        "Petrol": [
          "S 450e AMG Line",
          "S 450e"
        ]
      },
      "basePrice": 22000000,
      "variantPrices": {
        "Petrol": {
          "S 450e AMG Line": {
            "exShowroomPrice": 2,
            "engineCC": 2999
          },
          "S 450e": {
            "exShowroomPrice": 2,
            "engineCC": 2999
          }
        }
      }
    },
    "V-Class Extra LWB": {
      "bodyType": "Car",
      "fuelTypes": {
        "Diesel": [
          "V300d"
        ],
        "Petrol": [
          "V300"
        ]
      },
      "basePrice": 14000000,
      "variantPrices": {
        "Diesel": {
          "V300d": {
            "exShowroomPrice": 1,
            "engineCC": 1951
          }
        },
        "Petrol": {
          "V300": {
            "exShowroomPrice": 1,
            "engineCC": 1999
          }
        }
      }
    }
  },
  "Nissan": {
    "Gravite": {
      "bodyType": "MPV",
      "fuelTypes": {
        "CNG": [
          "Acenta",
          "Acenta CNG",
          "N-Connecta",
          "Tekna",
          "Tekna Launch Edition",
          "Visia",
          "Visia CNG"
        ],
        "Petrol": [
          "Acenta",
          "N-Connecta",
          "N-Connecta EZ Shift",
          "Tekna",
          "Tekna EZ Shift",
          "Tekna Launch Edition",
          "Tekna Launch Edition EZ Shift",
          "Tekna LE",
          "Visia",
          "Visia Plus"
        ]
      },
      "basePrice": 573000,
      "variantPrices": {
        "CNG": {
          "Visia": {
            "exShowroomPrice": 659000,
            "engineCC": 999
          },
          "Tekna Launch Edition": {
            "exShowroomPrice": 938000,
            "engineCC": 999
          },
          "Tekna": {
            "exShowroomPrice": 894000,
            "engineCC": 999
          },
          "Acenta": {
            "exShowroomPrice": 754000,
            "engineCC": 999
          },
          "N-Connecta": {
            "exShowroomPrice": 824000,
            "engineCC": 999
          }
        },
        "Petrol": {
          "Tekna Launch Edition": {
            "exShowroomPrice": 853000,
            "engineCC": 999
          },
          "Visia": {
            "exShowroomPrice": 573000,
            "engineCC": 999
          },
          "N-Connecta": {
            "exShowroomPrice": 738000,
            "engineCC": 999
          },
          "Tekna Launch Edition EZ Shift": {
            "exShowroomPrice": 909000,
            "engineCC": 999
          },
          "Acenta": {
            "exShowroomPrice": 668000,
            "engineCC": 999
          },
          "Tekna": {
            "exShowroomPrice": 808000,
            "engineCC": 999
          },
          "Tekna EZ Shift": {
            "exShowroomPrice": 864000,
            "engineCC": 999
          },
          "N-Connecta EZ Shift": {
            "exShowroomPrice": 795000,
            "engineCC": 999
          }
        }
      }
    },
    "Magnite": {
      "bodyType": "SUV",
      "fuelTypes": {
        "CNG": [
          "Acenta",
          "Acenta CNG",
          "N Connecta",
          "N-Connecta CNG",
          "Tekna",
          "Tekna Plus",
          "Visia",
          "Visia CNG",
          "Visia Plus",
          "Visia Plus CNG"
        ],
        "Petrol": [
          "Acenta",
          "Acenta AMT",
          "Acenta Turbo CVT",
          "KURO Edition",
          "KURO Edition AMT",
          "KURO Edition Turbo",
          "KURO Edition Turbo CVT",
          "N Connecta",
          "N Connecta AMT",
          "N Connecta Turbo",
          "N Connecta Turbo CVT",
          "N-Connecta",
          "Tekna",
          "Tekna AMT",
          "Tekna Plus",
          "Tekna Plus AMT",
          "Tekna Plus Turbo",
          "Tekna Plus Turbo CVT",
          "Tekna Turbo",
          "Tekna Turbo CVT",
          "Visia",
          "Visia AMT",
          "Visia Plus"
        ]
      },
      "basePrice": 568000,
      "variantPrices": {
        "CNG": {
          "Visia Plus": {
            "exShowroomPrice": 697000,
            "engineCC": 999
          },
          "N Connecta": {
            "exShowroomPrice": 821000,
            "engineCC": 999
          },
          "Visia": {
            "exShowroomPrice": 643000,
            "engineCC": 999
          },
          "Tekna Plus": {
            "exShowroomPrice": 947000,
            "engineCC": 999
          },
          "Acenta": {
            "exShowroomPrice": 758000,
            "engineCC": 999
          },
          "Tekna": {
            "exShowroomPrice": 914000,
            "engineCC": 999
          }
        },
        "Petrol": {
          "KURO Edition Turbo": {
            "exShowroomPrice": 912000,
            "engineCC": 999
          },
          "Tekna Turbo": {
            "exShowroomPrice": 957000,
            "engineCC": 999
          },
          "Visia": {
            "exShowroomPrice": 568000,
            "engineCC": 999
          },
          "Tekna AMT": {
            "exShowroomPrice": 894000,
            "engineCC": 999
          },
          "Tekna": {
            "exShowroomPrice": 839000,
            "engineCC": 999
          },
          "N Connecta Turbo": {
            "exShowroomPrice": 877000,
            "engineCC": 999
          },
          "Tekna Plus": {
            "exShowroomPrice": 872000,
            "engineCC": 999
          },
          "Visia AMT": {
            "exShowroomPrice": 627000,
            "engineCC": 999
          },
          "Acenta Turbo CVT": {
            "exShowroomPrice": 926000,
            "engineCC": 999
          },
          "KURO Edition": {
            "exShowroomPrice": 781000,
            "engineCC": 999
          },
          "N Connecta Turbo CVT": {
            "exShowroomPrice": 970000,
            "engineCC": 999
          },
          "Tekna Plus Turbo CVT": {
            "exShowroomPrice": 1099000,
            "engineCC": 999
          },
          "Acenta": {
            "exShowroomPrice": 683000,
            "engineCC": 999
          },
          "Tekna Plus AMT": {
            "exShowroomPrice": 927000,
            "engineCC": 999
          },
          "KURO Edition AMT": {
            "exShowroomPrice": 836000,
            "engineCC": 999
          },
          "Tekna Turbo CVT": {
            "exShowroomPrice": 1065000,
            "engineCC": 999
          },
          "N Connecta AMT": {
            "exShowroomPrice": 801000,
            "engineCC": 999
          },
          "Visia Plus": {
            "exShowroomPrice": 622000,
            "engineCC": 999
          },
          "N Connecta": {
            "exShowroomPrice": 746000,
            "engineCC": 999
          },
          "KURO Edition Turbo CVT": {
            "exShowroomPrice": 999000,
            "engineCC": 999
          },
          "Tekna Plus Turbo": {
            "exShowroomPrice": 991000,
            "engineCC": 999
          },
          "Acenta AMT": {
            "exShowroomPrice": 738000,
            "engineCC": 999
          },
          "N-Connecta": {
            "exShowroomPrice": 746000,
            "engineCC": 999,
            "source": "existing_variant_price_alias"
          }
        }
      }
    },
    "Tekton": {
      "bodyType": "SUV",
      "fuelTypes": {
        "Petrol": [
          "Acenta",
          "Acenta T160 1-litre MT",
          "Acenta T280 1.3-litre DCT",
          "N-Connecta",
          "N-Connecta T160 1-litre MT",
          "N-Connecta T280 1.3-litre DCT",
          "N-Connecta T280 1.3-litre MT",
          "Tekna",
          "Tekna Plus",
          "Tekna Plus T160 1-litre MT",
          "Tekna Plus T280 1.3-litre DCT",
          "Tekna T160 1-litre MT",
          "Tekna T280 1.3-litre DCT",
          "Tekna T280 1.3-litre MT",
          "Visia",
          "Visia Plus",
          "Visia Plus T160 1-litre MT",
          "Visia T160 1-litre MT"
        ]
      },
      "basePrice": 1049000,
      "variantPrices": {
        "Petrol": {
          "Tekna T280 1.3-litre MT": {
            "exShowroomPrice": 1639000,
            "engineCC": 1333
          },
          "Tekna T160 1-litre MT": {
            "exShowroomPrice": 1539000,
            "engineCC": 999
          },
          "Tekna T280 1.3-litre DCT": {
            "exShowroomPrice": 1779000,
            "engineCC": 1333
          },
          "Visia Plus T160 1-litre MT": {
            "exShowroomPrice": 1114000,
            "engineCC": 999
          },
          "Tekna Plus T280 1.3-litre DCT": {
            "exShowroomPrice": 1859000,
            "engineCC": 1333
          },
          "N-Connecta T280 1.3-litre DCT": {
            "exShowroomPrice": 1649000,
            "engineCC": 1333
          },
          "N-Connecta T160 1-litre MT": {
            "exShowroomPrice": 1369000,
            "engineCC": 999
          },
          "Acenta T160 1-litre MT": {
            "exShowroomPrice": 1179000,
            "engineCC": 999
          },
          "N-Connecta T280 1.3-litre MT": {
            "exShowroomPrice": 1499000,
            "engineCC": 1333
          },
          "Acenta T280 1.3-litre DCT": {
            "exShowroomPrice": 1499000,
            "engineCC": 1333
          },
          "Tekna Plus T160 1-litre MT": {
            "exShowroomPrice": 1649000,
            "engineCC": 999
          },
          "Visia T160 1-litre MT": {
            "exShowroomPrice": 1049000,
            "engineCC": 999
          }
        }
      }
    },
    "X-Trail": {
      "bodyType": "SUV",
      "fuelTypes": {
        "Petrol": [
          "STD"
        ],
        "Petrol Mild-Hybrid": [
          "STD (single/top trim)"
        ]
      },
      "basePrice": 4820000,
      "variantPrices": {
        "Petrol": {
          "STD": {
            "exShowroomPrice": 4820000,
            "engineCC": 1498
          }
        },
        "Petrol Mild-Hybrid": {}
      }
    }
  },
  "Pmv": {
    "EaS E": {
      "bodyType": "Car",
      "fuelTypes": {
        "Electric": [
          "EaS E"
        ]
      },
      "basePrice": 479000,
      "variantPrices": {
        "Electric": {
          "EaS E": {
            "exShowroomPrice": 479000
          }
        }
      }
    }
  },
  "Porsche": {
    "911": {
      "bodyType": "Car",
      "fuelTypes": {
        "Petrol": [
          "Turbo S",
          "Carrera 4 GTS",
          "Carrera",
          "Turbo 50 Years"
        ]
      },
      "basePrice": 20000000,
      "variantPrices": {
        "Petrol": {
          "Turbo S": {
            "exShowroomPrice": 4,
            "engineCC": 3591
          },
          "Carrera 4 GTS": {
            "exShowroomPrice": 3,
            "engineCC": 3996
          },
          "Carrera": {
            "exShowroomPrice": 2,
            "engineCC": 2981
          },
          "Turbo 50 Years": {
            "exShowroomPrice": 4,
            "engineCC": 3745
          }
        }
      }
    },
    "Cayenne": {
      "bodyType": "SUV",
      "fuelTypes": {
        "Petrol": [
          "STD",
          "GTS"
        ]
      },
      "basePrice": 13900000,
      "variantPrices": {
        "Petrol": {
          "STD": {
            "exShowroomPrice": 1,
            "engineCC": 2894
          },
          "GTS": {
            "exShowroomPrice": 2,
            "engineCC": 2894
          }
        }
      }
    },
    "Cayenne Coupe": {
      "bodyType": "SUV",
      "fuelTypes": {
        "Petrol": [
          "STD",
          "GTS"
        ]
      },
      "basePrice": 14400000,
      "variantPrices": {
        "Petrol": {
          "STD": {
            "exShowroomPrice": 1,
            "engineCC": 2894
          },
          "GTS": {
            "exShowroomPrice": 2,
            "engineCC": 3996
          }
        }
      }
    },
    "Cayenne Electric": {
      "bodyType": "SUV",
      "fuelTypes": {
        "Electric": [
          "Cayenne Turbo",
          "Cayenne Standard"
        ]
      },
      "basePrice": 17600000,
      "variantPrices": {
        "Electric": {
          "Cayenne Turbo": {
            "exShowroomPrice": 2
          },
          "Cayenne Standard": {
            "exShowroomPrice": 2
          }
        }
      }
    },
    "Macan": {
      "bodyType": "SUV",
      "fuelTypes": {
        "Petrol": [
          "Standard"
        ]
      },
      "basePrice": 8965000,
      "variantPrices": {
        "Petrol": {
          "Standard": {
            "exShowroomPrice": 8965000,
            "engineCC": 1984
          }
        }
      }
    },
    "Macan EV": {
      "bodyType": "SUV",
      "fuelTypes": {
        "Electric": [
          "Standard",
          "4S",
          "Turbo"
        ]
      },
      "basePrice": 12200000,
      "variantPrices": {
        "Electric": {
          "Standard": {
            "exShowroomPrice": 1
          },
          "4S": {
            "exShowroomPrice": 2
          },
          "Turbo": {
            "exShowroomPrice": 2
          }
        }
      }
    },
    "Panamera": {
      "bodyType": "Sedan",
      "fuelTypes": {
        "Petrol": [
          "STD Hybrid",
          "GTS"
        ]
      },
      "basePrice": 17100000,
      "variantPrices": {
        "Petrol": {
          "STD Hybrid": {
            "exShowroomPrice": 2,
            "engineCC": 2894
          },
          "GTS": {
            "exShowroomPrice": 2,
            "engineCC": 3996
          }
        }
      }
    },
    "Taycan": {
      "bodyType": "Electric",
      "fuelTypes": {
        "Electric": [
          "STD",
          "Turbo",
          "4S"
        ]
      },
      "basePrice": 17000000,
      "variantPrices": {
        "Electric": {
          "STD": {
            "exShowroomPrice": 2
          },
          "Turbo": {
            "exShowroomPrice": 3
          },
          "4S": {
            "exShowroomPrice": 2
          }
        }
      }
    }
  },
  "Pravaig": {
    "DEFY": {
      "bodyType": "Car",
      "fuelTypes": {
        "Electric": [
          "Hacker Edition"
        ]
      },
      "basePrice": 3950000,
      "variantPrices": {
        "Electric": {
          "Hacker Edition": {
            "exShowroomPrice": 3950000
          }
        }
      }
    }
  },
  "Renault": {
    "Duster": {
      "bodyType": "SUV",
      "fuelTypes": {
        "Petrol": [
          "Adventure 1.0 Turbo",
          "Adventure 1.3 Turbo",
          "Adventure 1.3 Turbo DCT",
          "Authentic",
          "Authentic 1.0 Turbo",
          "Evolution",
          "Evolution 1.0 Turbo",
          "Evolution 1.3 Turbo",
          "Evolution 1.3 Turbo DCT",
          "Iconic",
          "Iconic 1.3 Turbo",
          "Iconic 1.3 Turbo DCT",
          "Iconic 1.3 Turbo DT",
          "Iconic 1.3 Turbo DT DCT",
          "Iconic Launch Edition",
          "Iconic Launch Edition DCT",
          "Techno",
          "Techno 1.0 Turbo",
          "Techno 1.3 Turbo",
          "Techno 1.3 Turbo DCT",
          "Techno 1.3 Turbo DT",
          "Techno 1.3 Turbo DT DCT",
          "Techno Plus 1.3 Turbo",
          "Techno Plus 1.3 Turbo DCT",
          "Techno Plus 1.3 Turbo DT",
          "Techno Plus 1.3 Turbo DT DCT",
          "Techno+"
        ]
      },
      "basePrice": 1049000,
      "variantPrices": {
        "Petrol": {
          "Techno Plus 1.3 Turbo DCT": {
            "exShowroomPrice": 1669000,
            "engineCC": 1333
          },
          "Adventure 1.0 Turbo": {
            "exShowroomPrice": 1299000,
            "engineCC": 999
          },
          "Iconic 1.3 Turbo": {
            "exShowroomPrice": 1699000,
            "engineCC": 1333
          },
          "Techno Plus 1.3 Turbo": {
            "exShowroomPrice": 1529000,
            "engineCC": 1333
          },
          "Iconic Launch Edition DCT": {
            "exShowroomPrice": 1869000,
            "engineCC": 1333
          },
          "Techno Plus 1.3 Turbo DT DCT": {
            "exShowroomPrice": 1689000,
            "engineCC": 1333
          },
          "Evolution 1.3 Turbo": {
            "exShowroomPrice": 1299000,
            "engineCC": 1333
          },
          "Iconic 1.3 Turbo DCT": {
            "exShowroomPrice": 1849000,
            "engineCC": 1333
          },
          "Techno 1.3 Turbo DT DCT": {
            "exShowroomPrice": 1869000,
            "engineCC": 1333
          },
          "Iconic 1.3 Turbo DT": {
            "exShowroomPrice": 1719000,
            "engineCC": 1333
          },
          "Authentic 1.0 Turbo": {
            "exShowroomPrice": 1049000,
            "engineCC": 999
          },
          "Iconic Launch Edition": {
            "exShowroomPrice": 1719000,
            "engineCC": 1333
          },
          "Techno 1.0 Turbo": {
            "exShowroomPrice": 1349000,
            "engineCC": 999
          },
          "Evolution 1.3 Turbo DCT": {
            "exShowroomPrice": 1449000,
            "engineCC": 1333
          },
          "Techno 1.3 Turbo DCT": {
            "exShowroomPrice": 1849000,
            "engineCC": 1333
          },
          "Iconic 1.3 Turbo DT DCT": {
            "exShowroomPrice": 1869000,
            "engineCC": 1333
          },
          "Techno 1.3 Turbo": {
            "exShowroomPrice": 1449000,
            "engineCC": 1333
          },
          "Techno Plus 1.3 Turbo DT": {
            "exShowroomPrice": 1549000,
            "engineCC": 1333
          },
          "Evolution 1.0 Turbo": {
            "exShowroomPrice": 1169000,
            "engineCC": 999
          },
          "Techno 1.3 Turbo DT": {
            "exShowroomPrice": 1469000,
            "engineCC": 1333
          },
          "Adventure 1.3 Turbo": {
            "exShowroomPrice": 1399000,
            "engineCC": 1333
          },
          "Adventure 1.3 Turbo DCT": {
            "exShowroomPrice": 1539000,
            "engineCC": 1333
          }
        }
      }
    },
    "KWID": {
      "bodyType": "Hatchback",
      "fuelTypes": {
        "CNG": [
          "Evolution",
          "Climber"
        ],
        "Petrol": [
          "Climber AMT",
          "Evolution",
          "Evolution AMT",
          "Climber"
        ]
      },
      "basePrice": 453000,
      "variantPrices": {
        "CNG": {
          "Evolution": {
            "exShowroomPrice": 523000,
            "engineCC": 999
          },
          "Climber": {
            "exShowroomPrice": 585000,
            "engineCC": 999
          }
        },
        "Petrol": {
          "Climber AMT": {
            "exShowroomPrice": 561000,
            "engineCC": 999
          },
          "Evolution": {
            "exShowroomPrice": 453000,
            "engineCC": 999
          },
          "Evolution AMT": {
            "exShowroomPrice": 490000,
            "engineCC": 999
          },
          "Climber": {
            "exShowroomPrice": 515000,
            "engineCC": 999
          }
        }
      }
    },
    "Kiger": {
      "bodyType": "SUV",
      "fuelTypes": {
        "Petrol": [
          "Authentic",
          "Emotion",
          "Emotion DT",
          "Emotion Turbo",
          "Emotion Turbo CVT",
          "Emotion Turbo DT",
          "Emotion Turbo DT CVT",
          "Evolution",
          "Evolution AMT",
          "Evolution Plus",
          "Evolution Plus AMT",
          "Evolution Plus Turbo",
          "Techno",
          "Techno AMT",
          "Techno DT",
          "Techno DT AMT",
          "Techno Turbo",
          "Techno Turbo CVT",
          "Techno Turbo DT CVT"
        ]
      },
      "basePrice": 581000,
      "variantPrices": {
        "Petrol": {
          "Evolution Plus AMT": {
            "exShowroomPrice": 745000,
            "engineCC": 999
          },
          "Evolution Plus": {
            "exShowroomPrice": 699000,
            "engineCC": 999
          },
          "Emotion Turbo DT": {
            "exShowroomPrice": 933000,
            "engineCC": 999
          },
          "Techno DT AMT": {
            "exShowroomPrice": 805000,
            "engineCC": 999
          },
          "Techno DT": {
            "exShowroomPrice": 755000,
            "engineCC": 999
          },
          "Evolution AMT": {
            "exShowroomPrice": 699000,
            "engineCC": 999
          },
          "Techno AMT": {
            "exShowroomPrice": 805000,
            "engineCC": 999
          },
          "Emotion DT": {
            "exShowroomPrice": 845000,
            "engineCC": 999
          },
          "Techno": {
            "exShowroomPrice": 755000,
            "engineCC": 999
          },
          "Techno Turbo CVT": {
            "exShowroomPrice": 935000,
            "engineCC": 999
          },
          "Evolution Plus Turbo": {
            "exShowroomPrice": 789000,
            "engineCC": 999
          },
          "Evolution": {
            "exShowroomPrice": 655000,
            "engineCC": 999
          },
          "Emotion Turbo CVT": {
            "exShowroomPrice": 1035000,
            "engineCC": 999
          },
          "Techno Turbo": {
            "exShowroomPrice": 845000,
            "engineCC": 999
          },
          "Emotion": {
            "exShowroomPrice": 845000,
            "engineCC": 999
          },
          "Authentic": {
            "exShowroomPrice": 581000,
            "engineCC": 999
          },
          "Emotion Turbo DT CVT": {
            "exShowroomPrice": 1035000,
            "engineCC": 999
          },
          "Techno Turbo DT CVT": {
            "exShowroomPrice": 935000,
            "engineCC": 999
          },
          "Emotion Turbo": {
            "exShowroomPrice": 935000,
            "engineCC": 999
          }
        }
      }
    },
    "Triber": {
      "bodyType": "MPV",
      "fuelTypes": {
        "Petrol": [
          "Authentic",
          "Emotion",
          "Emotion AMT",
          "Emotion AMT Dual Tone",
          "Emotion Dual Tone",
          "Evolution",
          "Techno"
        ]
      },
      "basePrice": 581000,
      "variantPrices": {
        "Petrol": {
          "Emotion AMT": {
            "exShowroomPrice": 848000,
            "engineCC": 999
          },
          "Emotion Dual Tone": {
            "exShowroomPrice": 821000,
            "engineCC": 999
          },
          "Authentic": {
            "exShowroomPrice": 581000,
            "engineCC": 999
          },
          "Evolution": {
            "exShowroomPrice": 670000,
            "engineCC": 999
          },
          "Emotion": {
            "exShowroomPrice": 800000,
            "engineCC": 999
          },
          "Emotion AMT Dual Tone": {
            "exShowroomPrice": 869000,
            "engineCC": 999
          },
          "Techno": {
            "exShowroomPrice": 739000,
            "engineCC": 999
          }
        }
      }
    }
  },
  "Skoda": {
    "Kodiaq": {
      "bodyType": "SUV",
      "fuelTypes": {
        "Petrol": [
          "L&K",
          "Lounge",
          "Selection L&K",
          "Sportline",
          "Style"
        ]
      },
      "basePrice": 3699000,
      "variantPrices": {
        "Petrol": {
          "Lounge": {
            "exShowroomPrice": 3699000,
            "engineCC": 1984
          },
          "Selection L&K": {
            "exShowroomPrice": 4699000,
            "engineCC": 1984
          },
          "Sportline": {
            "exShowroomPrice": 4499000,
            "engineCC": 1984
          }
        }
      }
    },
    "Kodiaq RS": {
      "bodyType": "SUV",
      "fuelTypes": {
        "Petrol": [
          "2.0 TSI"
        ]
      },
      "basePrice": 6699000,
      "variantPrices": {
        "Petrol": {
          "2.0 TSI": {
            "exShowroomPrice": 6699000,
            "engineCC": 1984
          }
        }
      }
    },
    "Kushaq": {
      "bodyType": "Compact SUV",
      "fuelTypes": {
        "Petrol": [
          "1.0L Classic Plus",
          "1.0L Classic Plus AT",
          "1.0L Monte Carlo AT",
          "1.0L Prestige",
          "1.0L Prestige AT",
          "1.0L Signature",
          "1.0L Signature AT",
          "1.0L Sportline",
          "1.0L Sportline AT",
          "1.5L Monte Carlo DSG",
          "1.5L Prestige DSG",
          "Active",
          "Ambition",
          "Monte Carlo",
          "Style"
        ]
      },
      "basePrice": 1069000,
      "variantPrices": {
        "Petrol": {
          "1.0L Classic Plus": {
            "exShowroomPrice": 1069000,
            "engineCC": 999
          },
          "1.0L Prestige": {
            "exShowroomPrice": 1679000,
            "engineCC": 999
          },
          "1.0L Signature AT": {
            "exShowroomPrice": 1559000,
            "engineCC": 999
          },
          "1.0L Prestige AT": {
            "exShowroomPrice": 1759000,
            "engineCC": 999
          },
          "1.0L Signature": {
            "exShowroomPrice": 1459000,
            "engineCC": 999
          },
          "1.0L Monte Carlo AT": {
            "exShowroomPrice": 1789000,
            "engineCC": 999
          },
          "1.0L Classic Plus AT": {
            "exShowroomPrice": 1289000,
            "engineCC": 999
          },
          "1.5L Monte Carlo DSG": {
            "exShowroomPrice": 1899000,
            "engineCC": 1498
          },
          "1.5L Prestige DSG": {
            "exShowroomPrice": 1879000,
            "engineCC": 1498
          },
          "1.0L Sportline": {
            "exShowroomPrice": 1474000,
            "engineCC": 999
          },
          "1.0L Sportline AT": {
            "exShowroomPrice": 1574000,
            "engineCC": 999
          }
        }
      }
    },
    "Kylaq": {
      "bodyType": "Compact SUV (sub-4m)",
      "fuelTypes": {
        "Petrol": [
          "Classic",
          "Classic Plus",
          "Classic Plus AT",
          "Prestige",
          "Prestige AT",
          "Prestige Plus",
          "Prestige Plus AT",
          "Signature",
          "Signature AT",
          "Signature Plus",
          "Signature Plus AT",
          "Signature+",
          "Sportline",
          "Sportline AT"
        ]
      },
      "basePrice": 759000,
      "variantPrices": {
        "Petrol": {
          "Prestige Plus AT": {
            "exShowroomPrice": 1299000,
            "engineCC": 999
          },
          "Classic": {
            "exShowroomPrice": 759000,
            "engineCC": 999
          },
          "Signature AT": {
            "exShowroomPrice": 1043000,
            "engineCC": 999
          },
          "Signature": {
            "exShowroomPrice": 943000,
            "engineCC": 999
          },
          "Classic Plus": {
            "exShowroomPrice": 825000,
            "engineCC": 999
          },
          "Sportline": {
            "exShowroomPrice": 1132000,
            "engineCC": 999
          },
          "Prestige": {
            "exShowroomPrice": 1175000,
            "engineCC": 999
          },
          "Classic Plus AT": {
            "exShowroomPrice": 925000,
            "engineCC": 999
          },
          "Signature Plus": {
            "exShowroomPrice": 1077000,
            "engineCC": 999
          },
          "Signature Plus AT": {
            "exShowroomPrice": 1177000,
            "engineCC": 999
          },
          "Sportline AT": {
            "exShowroomPrice": 1232000,
            "engineCC": 999
          },
          "Prestige AT": {
            "exShowroomPrice": 1275000,
            "engineCC": 999
          },
          "Prestige Plus": {
            "exShowroomPrice": 1199000,
            "engineCC": 999
          },
          "Signature+": {
            "exShowroomPrice": 943000,
            "engineCC": 999,
            "source": "existing_variant_price_alias"
          }
        }
      }
    },
    "Octavia RS": {
      "bodyType": "Car",
      "fuelTypes": {
        "Petrol": [
          "STD"
        ]
      },
      "basePrice": 4999000,
      "variantPrices": {
        "Petrol": {
          "STD": {
            "exShowroomPrice": 4999000,
            "engineCC": 1984
          }
        }
      }
    },
    "Slavia": {
      "bodyType": "Sedan",
      "fuelTypes": {
        "Petrol": [
          "1.0L Classic",
          "1.0L Monte Carlo",
          "1.0L Monte Carlo AT",
          "1.0L Prestige",
          "1.0L Prestige AT",
          "1.0L Signature",
          "1.0L Signature AT",
          "1.0L Sportline",
          "1.0L Sportline AT",
          "1.5L Monte Carlo DSG",
          "1.5L Prestige DSG",
          "1.5L Sportline DSG",
          "Active",
          "Ambition",
          "Monte Carlo",
          "Style"
        ]
      },
      "basePrice": 1000000,
      "variantPrices": {
        "Petrol": {
          "1.5L Prestige DSG": {
            "exShowroomPrice": 1804000,
            "engineCC": 1498
          },
          "1.0L Monte Carlo": {
            "exShowroomPrice": 1500000,
            "engineCC": 999
          },
          "1.0L Monte Carlo AT": {
            "exShowroomPrice": 1679000,
            "engineCC": 999
          },
          "1.5L Monte Carlo DSG": {
            "exShowroomPrice": 1829000,
            "engineCC": 1498
          },
          "1.0L Sportline AT": {
            "exShowroomPrice": 1474000,
            "engineCC": 999
          },
          "1.5L Sportline DSG": {
            "exShowroomPrice": 1619000,
            "engineCC": 1498
          },
          "1.0L Prestige AT": {
            "exShowroomPrice": 1654000,
            "engineCC": 999
          },
          "1.0L Sportline": {
            "exShowroomPrice": 1374000,
            "engineCC": 999
          },
          "1.0L Signature AT": {
            "exShowroomPrice": 1444000,
            "engineCC": 999
          },
          "1.0L Signature": {
            "exShowroomPrice": 1344000,
            "engineCC": 999
          },
          "1.0L Prestige": {
            "exShowroomPrice": 1544000,
            "engineCC": 999
          },
          "1.0L Classic": {
            "exShowroomPrice": 1000000,
            "engineCC": 999
          }
        }
      }
    }
  },
  "Strom-Motors": {
    "R3": {
      "bodyType": "Car",
      "fuelTypes": {
        "Electric": [
          "2-Door"
        ]
      },
      "basePrice": 450000,
      "variantPrices": {
        "Electric": {
          "2-Door": {
            "exShowroomPrice": 450000
          }
        }
      }
    }
  },
  "Tata Motors": {
    "Altroz": {
      "bodyType": "Hatchback",
      "fuelTypes": {
        "CNG": [
          "Accomplished S",
          "Accomplished S AMT",
          "Creative",
          "Creative AMT",
          "Creative S",
          "Creative S AMT",
          "Discover",
          "Fearless",
          "Fearless+",
          "Pure",
          "Pure AMT",
          "Pure S",
          "Pure S AMT",
          "Smart"
        ],
        "Petrol": [
          "Accomplished Plus S DCA",
          "Accomplished S",
          "Accomplished S DCA",
          "Creative",
          "Creative AMT",
          "Creative S",
          "Creative S AMT",
          "Creative S DCA",
          "Discover",
          "Fearless",
          "Fearless+",
          "Pure",
          "Pure AMT",
          "Pure S",
          "Pure S AMT",
          "Racer",
          "Smart",
          "XE",
          "XM",
          "XT",
          "XT+",
          "XZ",
          "XZ+",
          "XZ+ DCA (automatic)"
        ],
        "Diesel": [
          "Accomplished S",
          "Creative S",
          "Pure",
          "XE",
          "XM",
          "XT",
          "XZ",
          "XZ+"
        ]
      },
      "basePrice": 600000,
      "variantPrices": {
        "CNG": {
          "Creative S": {
            "exShowroomPrice": 950000,
            "engineCC": 1199
          },
          "Pure AMT": {
            "exShowroomPrice": 875000,
            "engineCC": 1199
          },
          "Pure S": {
            "exShowroomPrice": 850000,
            "engineCC": 1199
          },
          "Accomplished S": {
            "exShowroomPrice": 1035000,
            "engineCC": 1199
          },
          "Pure S AMT": {
            "exShowroomPrice": 905000,
            "engineCC": 1199
          },
          "Creative AMT": {
            "exShowroomPrice": 970000,
            "engineCC": 1199
          },
          "Creative S AMT": {
            "exShowroomPrice": 1000000,
            "engineCC": 1199
          },
          "Pure": {
            "exShowroomPrice": 820000,
            "engineCC": 1199
          },
          "Smart": {
            "exShowroomPrice": 730000,
            "engineCC": 1199
          },
          "Accomplished S AMT": {
            "exShowroomPrice": 1090000,
            "engineCC": 1199
          },
          "Creative": {
            "exShowroomPrice": 915000,
            "engineCC": 1199
          }
        },
        "Petrol": {
          "Smart": {
            "exShowroomPrice": 600000,
            "engineCC": 1199
          },
          "Accomplished S": {
            "exShowroomPrice": 930000,
            "engineCC": 1199
          },
          "Creative": {
            "exShowroomPrice": 810000,
            "engineCC": 1199
          },
          "Creative S AMT": {
            "exShowroomPrice": 902000,
            "engineCC": 1199
          },
          "Creative AMT": {
            "exShowroomPrice": 867000,
            "engineCC": 1199
          },
          "Pure S": {
            "exShowroomPrice": 745000,
            "engineCC": 1199
          },
          "Creative S": {
            "exShowroomPrice": 845000,
            "engineCC": 1199
          },
          "Creative S DCA": {
            "exShowroomPrice": 965000,
            "engineCC": 1199
          },
          "Pure AMT": {
            "exShowroomPrice": 772000,
            "engineCC": 1199
          },
          "Pure": {
            "exShowroomPrice": 715000,
            "engineCC": 1199
          },
          "Accomplished S DCA": {
            "exShowroomPrice": 1050000,
            "engineCC": 1199
          },
          "Pure S AMT": {
            "exShowroomPrice": 802000,
            "engineCC": 1199
          },
          "Accomplished Plus S DCA": {
            "exShowroomPrice": 1075000,
            "engineCC": 1199
          }
        },
        "Diesel": {
          "Creative S": {
            "exShowroomPrice": 960000,
            "engineCC": 1497
          },
          "Pure": {
            "exShowroomPrice": 830000,
            "engineCC": 1497
          },
          "Accomplished S": {
            "exShowroomPrice": 1045000,
            "engineCC": 1497
          }
        }
      }
    },
    "Curvv": {
      "bodyType": "Coupe SUV (ICE)",
      "fuelTypes": {
        "Petrol": [
          "Accomplished",
          "Accomplished X",
          "Accomplished X Dark",
          "Accomplished X Plus T-GDi Dark DCT",
          "Accomplished X Plus T-GDi DCT",
          "Accomplished+",
          "Creative",
          "Creative X Plus",
          "Creative X Plus Dark",
          "Creative X Plus Dark DCT",
          "Creative X Plus DCT",
          "Pure",
          "Pure X",
          "Pure X DCT",
          "Pure X Plus",
          "Pure X Plus Dark",
          "Pure X Plus Dark DCT",
          "Pure X Plus DCT",
          "Smart",
          "Smart X"
        ],
        "Diesel": [
          "Accomplished",
          "Accomplished X",
          "Accomplished X Dark",
          "Accomplished X Plus Dark DCT",
          "Accomplished X Plus DCT",
          "Accomplished+",
          "Creative",
          "Creative X Plus",
          "Creative X Plus Dark",
          "Pure",
          "Pure X Plus Dark",
          "Smart"
        ]
      },
      "basePrice": 1000000,
      "variantPrices": {
        "Petrol": {
          "Creative X Plus Dark DCT": {
            "exShowroomPrice": 1446000,
            "engineCC": 1199
          },
          "Pure X Plus": {
            "exShowroomPrice": 1180000,
            "engineCC": 1199
          },
          "Accomplished X Plus T-GDi DCT": {
            "exShowroomPrice": 1850000,
            "engineCC": 1199
          },
          "Accomplished X": {
            "exShowroomPrice": 1400000,
            "engineCC": 1199
          },
          "Accomplished X Dark": {
            "exShowroomPrice": 1425000,
            "engineCC": 1199
          },
          "Pure X Plus DCT": {
            "exShowroomPrice": 1310000,
            "engineCC": 1199
          },
          "Creative X Plus DCT": {
            "exShowroomPrice": 1421000,
            "engineCC": 1199
          },
          "Creative X Plus": {
            "exShowroomPrice": 1291000,
            "engineCC": 1199
          },
          "Pure X Plus Dark": {
            "exShowroomPrice": 1200000,
            "engineCC": 1199
          },
          "Pure X DCT": {
            "exShowroomPrice": 1230000,
            "engineCC": 1199
          },
          "Pure X Plus Dark DCT": {
            "exShowroomPrice": 1330000,
            "engineCC": 1199
          },
          "Smart X": {
            "exShowroomPrice": 1000000,
            "engineCC": 1199
          },
          "Pure X": {
            "exShowroomPrice": 1100000,
            "engineCC": 1199
          },
          "Creative X Plus Dark": {
            "exShowroomPrice": 1316000,
            "engineCC": 1199
          },
          "Accomplished X Plus T-GDi Dark DCT": {
            "exShowroomPrice": 1875000,
            "engineCC": 1199
          }
        },
        "Diesel": {
          "Creative X Plus": {
            "exShowroomPrice": 1421000,
            "engineCC": 1497
          },
          "Accomplished X": {
            "exShowroomPrice": 1530000,
            "engineCC": 1497
          },
          "Accomplished X Plus DCT": {
            "exShowroomPrice": 1875000,
            "engineCC": 1497
          },
          "Accomplished X Dark": {
            "exShowroomPrice": 1555000,
            "engineCC": 1497
          },
          "Pure X Plus Dark": {
            "exShowroomPrice": 1330000,
            "engineCC": 1497
          },
          "Creative X Plus Dark": {
            "exShowroomPrice": 1446000,
            "engineCC": 1497
          },
          "Accomplished X Plus Dark DCT": {
            "exShowroomPrice": 1900000,
            "engineCC": 1497
          }
        }
      }
    },
    "Curvv EV": {
      "bodyType": "Coupe SUV (Electric)",
      "fuelTypes": {
        "Electric": [
          "Accomplished",
          "Accomplished X 55",
          "Creative",
          "Empowered",
          "Empowered X 55",
          "Empowered X 55 Dark",
          "Empowered+"
        ]
      },
      "basePrice": 1719000,
      "variantPrices": {
        "Electric": {
          "Empowered X 55 Dark": {
            "exShowroomPrice": 1969000
          },
          "Empowered X 55": {
            "exShowroomPrice": 1939000
          },
          "Accomplished X 55": {
            "exShowroomPrice": 1719000
          }
        }
      }
    },
    "Harrier": {
      "bodyType": "Midsize SUV",
      "fuelTypes": {
        "Diesel": [
          "Adventure",
          "Adventure X",
          "Adventure X AT",
          "Adventure X Dark",
          "Adventure X Dark AT",
          "Adventure X Plus",
          "Adventure X Plus AT",
          "Adventure X Plus Dark",
          "Adventure X Plus Dark AT",
          "Camo Edition",
          "Dark Edition",
          "Fearless",
          "Fearless Ultra",
          "Fearless Ultra AT",
          "Fearless Ultra Red Dark",
          "Fearless Ultra Red DARK",
          "Fearless Ultra Red Dark AT",
          "Fearless X",
          "Fearless X AT",
          "Fearless X Dark",
          "Fearless X Dark AT",
          "Fearless X Plus",
          "Fearless X Plus AT",
          "Fearless X Plus Dark",
          "Fearless X Plus Dark AT",
          "Fearless X Plus Stealth",
          "Fearless X Plus Stealth AT",
          "Fearless+",
          "Pure",
          "Pure X",
          "Pure X AT",
          "Pure X Dark",
          "Pure X Dark AT",
          "Righteous",
          "Smart",
          "Stealth Edition",
          "XE",
          "XM",
          "XT",
          "XZ",
          "XZ (automatic torque converter)",
          "XZ+",
          "XZ+(O)",
          "XZ+/XZ+(O) automatic"
        ],
        "Petrol": [
          "Adventure X",
          "Adventure X AT",
          "Adventure X Dark AT",
          "Adventure X DARK AT",
          "Adventure X Plus",
          "Adventure X Plus Dark",
          "Adventure X Plus DARK",
          "Adventure X Plus Dark AT",
          "Adventure X Plus DARK AT",
          "Fearless Ultra",
          "Fearless Ultra AT",
          "Fearless Ultra Red Dark",
          "Fearless Ultra Red DARK",
          "Fearless Ultra Red Dark AT",
          "Fearless Ultra Red DARK AT",
          "Fearless X",
          "Fearless X AT",
          "Fearless X Dark",
          "Fearless X DARK",
          "Fearless X Dark AT",
          "Fearless X DARK AT",
          "Fearless X Plus",
          "Fearless X Plus AT",
          "Fearless X Plus Dark",
          "Fearless X Plus DARK",
          "Fearless X Plus Dark AT",
          "Fearless X Plus DARK AT",
          "Pure X",
          "Pure X Dark",
          "Pure X DARK",
          "Pure X Dark AT",
          "Pure X DARK AT",
          "Smart"
        ]
      },
      "basePrice": 1300000,
      "variantPrices": {
        "Diesel": {
          "Adventure X AT": {
            "exShowroomPrice": 2000000,
            "engineCC": 1956
          },
          "Fearless X Plus AT": {
            "exShowroomPrice": 2470000,
            "engineCC": 1956
          },
          "Fearless X Plus Dark AT": {
            "exShowroomPrice": 2545000,
            "engineCC": 1956
          },
          "Fearless X": {
            "exShowroomPrice": 2145000,
            "engineCC": 1956
          },
          "Adventure X": {
            "exShowroomPrice": 1850000,
            "engineCC": 1956
          },
          "Fearless X Plus": {
            "exShowroomPrice": 2220000,
            "engineCC": 1956
          },
          "Adventure X Plus AT": {
            "exShowroomPrice": 2000000,
            "engineCC": 1956
          },
          "Pure X Dark": {
            "exShowroomPrice": 1815000,
            "engineCC": 1956
          },
          "Pure X": {
            "exShowroomPrice": 1750000,
            "engineCC": 1956
          },
          "Fearless X Plus Stealth AT": {
            "exShowroomPrice": 2535000,
            "engineCC": 1956
          },
          "Fearless X Dark AT": {
            "exShowroomPrice": 2355000,
            "engineCC": 1956
          },
          "Fearless X Dark": {
            "exShowroomPrice": 2200000,
            "engineCC": 1956
          },
          "Pure X AT": {
            "exShowroomPrice": 1900000,
            "engineCC": 1956
          },
          "Fearless X Plus Dark": {
            "exShowroomPrice": 2400000,
            "engineCC": 1956
          },
          "Fearless Ultra AT": {
            "exShowroomPrice": 2550000,
            "engineCC": 1956
          },
          "Adventure X Plus": {
            "exShowroomPrice": 1890000,
            "engineCC": 1956
          },
          "Adventure X Plus Dark AT": {
            "exShowroomPrice": 2095000,
            "engineCC": 1956
          },
          "Fearless Ultra Red Dark AT": {
            "exShowroomPrice": 2605000,
            "engineCC": 1956
          },
          "Fearless Ultra": {
            "exShowroomPrice": 2405000,
            "engineCC": 1956
          },
          "Adventure X Dark": {
            "exShowroomPrice": 1905000,
            "engineCC": 1956
          },
          "Adventure X Dark AT": {
            "exShowroomPrice": 2055000,
            "engineCC": 1956
          },
          "Fearless X AT": {
            "exShowroomPrice": 2300000,
            "engineCC": 1956
          },
          "Adventure X Plus Dark": {
            "exShowroomPrice": 1940000,
            "engineCC": 1956
          },
          "Fearless Ultra Red Dark": {
            "exShowroomPrice": 2460000,
            "engineCC": 1956
          },
          "Fearless X Plus Stealth": {
            "exShowroomPrice": 2395000,
            "engineCC": 1956
          },
          "Pure X Dark AT": {
            "exShowroomPrice": 1955000,
            "engineCC": 1956
          },
          "Smart": {
            "exShowroomPrice": 1400000,
            "engineCC": 1956
          },
          "Fearless Ultra Red DARK": {
            "exShowroomPrice": 2460000,
            "engineCC": 1956,
            "source": "existing_variant_price_alias"
          }
        },
        "Petrol": {
          "Fearless Ultra AT": {
            "exShowroomPrice": 2440000,
            "engineCC": 1498
          },
          "Adventure X Dark AT": {
            "exShowroomPrice": 1930000,
            "engineCC": 1498
          },
          "Fearless X Plus": {
            "exShowroomPrice": 2235000,
            "engineCC": 1498
          },
          "Pure X Dark AT": {
            "exShowroomPrice": 1835000,
            "engineCC": 1498
          },
          "Fearless Ultra": {
            "exShowroomPrice": 2295000,
            "engineCC": 1498
          },
          "Adventure X AT": {
            "exShowroomPrice": 1885000,
            "engineCC": 1498
          },
          "Fearless X AT": {
            "exShowroomPrice": 2200000,
            "engineCC": 1498
          },
          "Fearless X Plus AT": {
            "exShowroomPrice": 2380000,
            "engineCC": 1498
          },
          "Fearless X Plus Dark AT": {
            "exShowroomPrice": 2435000,
            "engineCC": 1498
          },
          "Adventure X Plus Dark AT": {
            "exShowroomPrice": 1970000,
            "engineCC": 1498
          },
          "Smart": {
            "exShowroomPrice": 1300000,
            "engineCC": 1498
          },
          "Adventure X Plus Dark": {
            "exShowroomPrice": 1810000,
            "engineCC": 1498
          },
          "Fearless X Plus Dark": {
            "exShowroomPrice": 2290000,
            "engineCC": 1498
          },
          "Adventure X": {
            "exShowroomPrice": 1725000,
            "engineCC": 1498
          },
          "Adventure X Plus": {
            "exShowroomPrice": 1760000,
            "engineCC": 1498
          },
          "Fearless Ultra Red Dark": {
            "exShowroomPrice": 2350000,
            "engineCC": 1498
          },
          "Pure X Dark": {
            "exShowroomPrice": 1705000,
            "engineCC": 1498
          },
          "Fearless X Dark": {
            "exShowroomPrice": 2095000,
            "engineCC": 1498
          },
          "Fearless X Dark AT": {
            "exShowroomPrice": 2255000,
            "engineCC": 1498
          },
          "Pure X": {
            "exShowroomPrice": 1640000,
            "engineCC": 1498
          },
          "Fearless X": {
            "exShowroomPrice": 2025000,
            "engineCC": 1498
          },
          "Fearless Ultra Red Dark AT": {
            "exShowroomPrice": 2495000,
            "engineCC": 1498
          },
          "Adventure X DARK AT": {
            "exShowroomPrice": 1930000,
            "engineCC": 1498,
            "source": "existing_variant_price_alias"
          },
          "Adventure X Plus DARK": {
            "exShowroomPrice": 1810000,
            "engineCC": 1498,
            "source": "existing_variant_price_alias"
          },
          "Adventure X Plus DARK AT": {
            "exShowroomPrice": 1970000,
            "engineCC": 1498,
            "source": "existing_variant_price_alias"
          },
          "Fearless Ultra Red DARK": {
            "exShowroomPrice": 2350000,
            "engineCC": 1498,
            "source": "existing_variant_price_alias"
          },
          "Fearless Ultra Red DARK AT": {
            "exShowroomPrice": 2495000,
            "engineCC": 1498,
            "source": "existing_variant_price_alias"
          },
          "Fearless X DARK": {
            "exShowroomPrice": 2095000,
            "engineCC": 1498,
            "source": "existing_variant_price_alias"
          },
          "Fearless X DARK AT": {
            "exShowroomPrice": 2255000,
            "engineCC": 1498,
            "source": "existing_variant_price_alias"
          },
          "Fearless X Plus DARK": {
            "exShowroomPrice": 2290000,
            "engineCC": 1498,
            "source": "existing_variant_price_alias"
          },
          "Fearless X Plus DARK AT": {
            "exShowroomPrice": 2435000,
            "engineCC": 1498,
            "source": "existing_variant_price_alias"
          },
          "Pure X DARK": {
            "exShowroomPrice": 1705000,
            "engineCC": 1498,
            "source": "existing_variant_price_alias"
          },
          "Pure X DARK AT": {
            "exShowroomPrice": 1835000,
            "engineCC": 1498,
            "source": "existing_variant_price_alias"
          }
        }
      }
    },
    "Harrier EV": {
      "bodyType": "Midsize SUV (Electric)",
      "fuelTypes": {
        "Electric": [
          "Adventure (RWD)",
          "Adventure 65",
          "Adventure 65 ACFC",
          "Adventure S 65",
          "Adventure S 65 ACFC",
          "Empowered (AWD)",
          "Empowered 75",
          "Empowered 75 ACFC",
          "Empowered 75 Stealth",
          "Empowered 75 Stealth ACFC",
          "Empowered QWD 75",
          "Empowered QWD 75 ACFC",
          "Empowered QWD 75 Stealth",
          "Empowered QWD 75 Stealth ACFC",
          "Fearless (RWD)",
          "Fearless Plus 65",
          "Fearless Plus 65 ACFC",
          "Fearless Plus 75",
          "Fearless Plus 75 ACFC",
          "Fearless Plus QWD 75",
          "Fearless Plus QWD 75 ACFC"
        ]
      },
      "basePrice": 2179000,
      "variantPrices": {
        "Electric": {
          "Empowered QWD 75": {
            "exShowroomPrice": 2929000
          },
          "Adventure S 65 ACFC": {
            "exShowroomPrice": 2279000
          },
          "Fearless Plus 75 ACFC": {
            "exShowroomPrice": 2579000
          },
          "Adventure S 65": {
            "exShowroomPrice": 2229000
          },
          "Empowered 75 ACFC": {
            "exShowroomPrice": 2829000
          },
          "Empowered 75": {
            "exShowroomPrice": 2779000
          },
          "Fearless Plus QWD 75": {
            "exShowroomPrice": 2679000
          },
          "Adventure 65 ACFC": {
            "exShowroomPrice": 2229000
          },
          "Empowered QWD 75 Stealth ACFC": {
            "exShowroomPrice": 3054000
          },
          "Fearless Plus QWD 75 ACFC": {
            "exShowroomPrice": 2729000
          },
          "Fearless Plus 65": {
            "exShowroomPrice": 2429000
          },
          "Empowered 75 Stealth": {
            "exShowroomPrice": 2854000
          },
          "Empowered QWD 75 Stealth": {
            "exShowroomPrice": 3004000
          },
          "Adventure 65": {
            "exShowroomPrice": 2179000
          },
          "Empowered 75 Stealth ACFC": {
            "exShowroomPrice": 2904000
          },
          "Fearless Plus 65 ACFC": {
            "exShowroomPrice": 2479000
          },
          "Empowered QWD 75 ACFC": {
            "exShowroomPrice": 2979000
          },
          "Fearless Plus 75": {
            "exShowroomPrice": 2529000
          }
        }
      }
    },
    "Nexon": {
      "bodyType": "Compact SUV",
      "fuelTypes": {
        "Petrol": [
          "Creative",
          "Creative AMT",
          "Creative CAMO",
          "Creative CAMO AMT",
          "Creative CAMO DCA",
          "Creative DCA",
          "Creative Plus PS CAMO",
          "Creative Plus PS CAMO DCA",
          "Creative Plus PS Dark",
          "Creative Plus PS Dark DCA",
          "Creative Plus PS DT",
          "Creative Plus PS DT DCA",
          "Creative Plus S",
          "Creative Plus S AMT",
          "Creative Plus S CAMO",
          "Creative Plus S CAMO AMT",
          "Creative Plus S Dark",
          "Creative Plus S Dark AMT",
          "Dark Edition",
          "Empowered",
          "Empowered+",
          "Fearless",
          "Fearless Plus A PS CAMO DCA",
          "Fearless Plus A PS Dark DCA",
          "Fearless Plus A PS DT DCA",
          "Fearless Plus A PS Red Dark DCA",
          "Fearless Plus PS CAMO",
          "Fearless Plus PS Dark",
          "Fearless Plus PS Dark DCA",
          "Fearless Plus PS DT",
          "Fearless Plus PS DT DCA",
          "Fearless Plus PS Red Dark",
          "Fearless+",
          "Fearless+ S / Dark Edition",
          "Kaziranga Edition",
          "Kaziranga special edition",
          "Kraz special edition",
          "Pure",
          "Pure Plus",
          "Pure Plus AMT",
          "Pure Plus PS",
          "Pure Plus PS AMT",
          "Pure Plus S",
          "Pure Plus S AMT",
          "Smart",
          "Smart Plus",
          "Smart Plus AMT",
          "Smart Plus S",
          "XE",
          "XM",
          "XM(S)",
          "XT",
          "XZ",
          "XZ+",
          "XZ+ AMT",
          "XZ+(O)",
          "XZ+/XZ+(O) AMT"
        ],
        "Diesel": [
          "Creative",
          "Creative AMT",
          "Creative CAMO",
          "Creative CAMO AMT",
          "Creative Plus PS Dark",
          "Creative Plus PS Dark AMT",
          "Creative Plus PS DT",
          "Creative Plus PS DT AMT",
          "Creative Plus S",
          "Creative Plus S AMT",
          "Creative Plus S CAMO",
          "Creative Plus S CAMO AMT",
          "Creative Plus S Dark",
          "Creative Plus S Dark AMT",
          "Dark Edition",
          "Empowered",
          "Empowered+",
          "Fearless",
          "Fearless Plus PS Dark",
          "Fearless Plus PS Dark AMT",
          "Fearless Plus PS DT",
          "Fearless Plus PS DT AMT",
          "Fearless Plus PS Red Dark",
          "Fearless Plus PS Red Dark AMT",
          "Fearless+",
          "Kaziranga Edition",
          "Kaziranga special edition",
          "Kraz special edition",
          "Pure",
          "Pure Plus",
          "Pure Plus AMT",
          "Pure Plus PS",
          "Pure Plus PS AMT",
          "Pure Plus S",
          "Smart",
          "Smart Plus",
          "Smart Plus S",
          "XE",
          "XM",
          "XM(S)",
          "XT",
          "XZ",
          "XZ+",
          "XZ+ AMT",
          "XZ+(O)",
          "XZ+/XZ+(O) AMT"
        ],
        "CNG": [
          "CNG (iCNG) variant",
          "Creative",
          "Creative CAMO",
          "Creative Plus PS CAMO",
          "Creative Plus PS Dark",
          "Creative Plus PS DT",
          "Creative Plus S",
          "Creative Plus S CAMO",
          "Creative Plus S Dark",
          "Fearless Plus PS CAMO",
          "Fearless Plus PS Dark",
          "Fearless Plus PS DT",
          "Fearless Plus PS Red Dark",
          "Pure Plus",
          "Pure Plus PS",
          "Pure Plus S",
          "Smart",
          "Smart Plus",
          "Smart Plus S"
        ]
      },
      "basePrice": 740000,
      "variantPrices": {
        "Petrol": {
          "Pure Plus PS": {
            "exShowroomPrice": 972000,
            "engineCC": 1199
          },
          "Fearless Plus A PS Red Dark DCA": {
            "exShowroomPrice": 1407000,
            "engineCC": 1199
          },
          "Creative CAMO": {
            "exShowroomPrice": 1017000,
            "engineCC": 1199
          },
          "Creative Plus PS Dark": {
            "exShowroomPrice": 1187000,
            "engineCC": 1199
          },
          "Creative Plus S AMT": {
            "exShowroomPrice": 1117000,
            "engineCC": 1199
          },
          "Smart Plus S": {
            "exShowroomPrice": 852000,
            "engineCC": 1199
          },
          "Fearless Plus PS DT": {
            "exShowroomPrice": 1235000,
            "engineCC": 1199
          },
          "Creative DCA": {
            "exShowroomPrice": 1142000,
            "engineCC": 1199
          },
          "Creative Plus S CAMO AMT": {
            "exShowroomPrice": 1142000,
            "engineCC": 1199
          },
          "Fearless Plus PS DT DCA": {
            "exShowroomPrice": 1326000,
            "engineCC": 1199
          },
          "Pure Plus AMT": {
            "exShowroomPrice": 972000,
            "engineCC": 1199
          },
          "Fearless Plus A PS CAMO DCA": {
            "exShowroomPrice": 1402000,
            "engineCC": 1199
          },
          "Fearless Plus PS Red Dark": {
            "exShowroomPrice": 1272000,
            "engineCC": 1199
          },
          "Fearless Plus A PS Dark DCA": {
            "exShowroomPrice": 1397000,
            "engineCC": 1199
          },
          "Smart Plus": {
            "exShowroomPrice": 822000,
            "engineCC": 1199
          },
          "Creative Plus PS CAMO DCA": {
            "exShowroomPrice": 1292000,
            "engineCC": 1199
          },
          "Creative Plus S": {
            "exShowroomPrice": 1047000,
            "engineCC": 1199
          },
          "Pure Plus S AMT": {
            "exShowroomPrice": 1000000,
            "engineCC": 1199
          },
          "Creative Plus S CAMO": {
            "exShowroomPrice": 1072000,
            "engineCC": 1199
          },
          "Creative CAMO AMT": {
            "exShowroomPrice": 1112000,
            "engineCC": 1199
          },
          "Pure Plus PS AMT": {
            "exShowroomPrice": 1027000,
            "engineCC": 1199
          },
          "Creative AMT": {
            "exShowroomPrice": 1087000,
            "engineCC": 1199
          },
          "Creative Plus PS DT": {
            "exShowroomPrice": 1140000,
            "engineCC": 1199
          },
          "Pure Plus": {
            "exShowroomPrice": 907000,
            "engineCC": 1199
          },
          "Creative Plus S Dark": {
            "exShowroomPrice": 1092000,
            "engineCC": 1199
          },
          "Creative CAMO DCA": {
            "exShowroomPrice": 1167000,
            "engineCC": 1199
          },
          "Creative Plus PS Dark DCA": {
            "exShowroomPrice": 1304000,
            "engineCC": 1199
          },
          "Creative Plus PS DT DCA": {
            "exShowroomPrice": 1255000,
            "engineCC": 1199
          },
          "Fearless Plus PS CAMO": {
            "exShowroomPrice": 1267000,
            "engineCC": 1199
          },
          "Fearless Plus PS Dark": {
            "exShowroomPrice": 1262000,
            "engineCC": 1199
          },
          "Fearless Plus PS Dark DCA": {
            "exShowroomPrice": 1345000,
            "engineCC": 1199
          },
          "Smart": {
            "exShowroomPrice": 740000,
            "engineCC": 1199
          },
          "Fearless Plus A PS DT DCA": {
            "exShowroomPrice": 1370000,
            "engineCC": 1199
          },
          "Creative": {
            "exShowroomPrice": 1017000,
            "engineCC": 1199
          },
          "Creative Plus S Dark AMT": {
            "exShowroomPrice": 1162000,
            "engineCC": 1199
          },
          "Creative Plus PS CAMO": {
            "exShowroomPrice": 1172000,
            "engineCC": 1199
          },
          "Pure Plus S": {
            "exShowroomPrice": 940000,
            "engineCC": 1199
          },
          "Smart Plus AMT": {
            "exShowroomPrice": 892000,
            "engineCC": 1199
          }
        },
        "Diesel": {
          "Fearless Plus PS Dark": {
            "exShowroomPrice": 1377000,
            "engineCC": 1497
          },
          "Fearless Plus PS DT AMT": {
            "exShowroomPrice": 1402000,
            "engineCC": 1497
          },
          "Pure Plus PS AMT": {
            "exShowroomPrice": 1137000,
            "engineCC": 1497
          },
          "Fearless Plus PS Red Dark AMT": {
            "exShowroomPrice": 1452000,
            "engineCC": 1497
          },
          "Pure Plus AMT": {
            "exShowroomPrice": 1087000,
            "engineCC": 1497
          },
          "Pure Plus S": {
            "exShowroomPrice": 1052000,
            "engineCC": 1497
          },
          "Creative": {
            "exShowroomPrice": 1137000,
            "engineCC": 1497
          },
          "Creative Plus PS Dark AMT": {
            "exShowroomPrice": 1367000,
            "engineCC": 1497
          },
          "Creative Plus S AMT": {
            "exShowroomPrice": 1227000,
            "engineCC": 1497
          },
          "Fearless Plus PS DT": {
            "exShowroomPrice": 1345000,
            "engineCC": 1497
          },
          "Fearless Plus PS Red Dark": {
            "exShowroomPrice": 1387000,
            "engineCC": 1497
          },
          "Creative Plus PS Dark": {
            "exShowroomPrice": 1302000,
            "engineCC": 1497
          },
          "Creative Plus S Dark AMT": {
            "exShowroomPrice": 1272000,
            "engineCC": 1497
          },
          "Creative Plus S Dark": {
            "exShowroomPrice": 1207000,
            "engineCC": 1497
          },
          "Fearless Plus PS Dark AMT": {
            "exShowroomPrice": 1442000,
            "engineCC": 1497
          },
          "Creative Plus PS DT": {
            "exShowroomPrice": 1250000,
            "engineCC": 1497
          },
          "Pure Plus": {
            "exShowroomPrice": 1000000,
            "engineCC": 1497
          },
          "Creative Plus S": {
            "exShowroomPrice": 1162000,
            "engineCC": 1497
          },
          "Creative Plus S CAMO": {
            "exShowroomPrice": 1187000,
            "engineCC": 1497
          },
          "Creative CAMO": {
            "exShowroomPrice": 1162000,
            "engineCC": 1497
          },
          "Creative Plus PS DT AMT": {
            "exShowroomPrice": 1315000,
            "engineCC": 1497
          },
          "Pure Plus PS": {
            "exShowroomPrice": 1072000,
            "engineCC": 1497
          },
          "Creative AMT": {
            "exShowroomPrice": 1197000,
            "engineCC": 1497
          },
          "Smart Plus S": {
            "exShowroomPrice": 957000,
            "engineCC": 1497
          },
          "Smart Plus": {
            "exShowroomPrice": 927000,
            "engineCC": 1497
          },
          "Creative Plus S CAMO AMT": {
            "exShowroomPrice": 1252000,
            "engineCC": 1497
          },
          "Creative CAMO AMT": {
            "exShowroomPrice": 1222000,
            "engineCC": 1497
          }
        },
        "CNG": {
          "Fearless Plus PS DT": {
            "exShowroomPrice": 1330000,
            "engineCC": 1199
          },
          "Pure Plus S": {
            "exShowroomPrice": 1000000,
            "engineCC": 1199
          },
          "Smart Plus S": {
            "exShowroomPrice": 957000,
            "engineCC": 1199
          },
          "Smart": {
            "exShowroomPrice": 835000,
            "engineCC": 1199
          },
          "Fearless Plus PS CAMO": {
            "exShowroomPrice": 1367000,
            "engineCC": 1199
          },
          "Creative Plus PS Dark": {
            "exShowroomPrice": 1287000,
            "engineCC": 1199
          },
          "Creative Plus S CAMO": {
            "exShowroomPrice": 1177000,
            "engineCC": 1199
          },
          "Creative": {
            "exShowroomPrice": 1122000,
            "engineCC": 1199
          },
          "Pure Plus": {
            "exShowroomPrice": 1000000,
            "engineCC": 1199
          },
          "Creative Plus S": {
            "exShowroomPrice": 1152000,
            "engineCC": 1199
          },
          "Creative CAMO": {
            "exShowroomPrice": 1147000,
            "engineCC": 1199
          },
          "Fearless Plus PS Dark": {
            "exShowroomPrice": 1362000,
            "engineCC": 1199
          },
          "Smart Plus": {
            "exShowroomPrice": 927000,
            "engineCC": 1199
          },
          "Pure Plus PS": {
            "exShowroomPrice": 1062000,
            "engineCC": 1199
          },
          "Fearless Plus PS Red Dark": {
            "exShowroomPrice": 1372000,
            "engineCC": 1199
          },
          "Creative Plus PS DT": {
            "exShowroomPrice": 1235000,
            "engineCC": 1199
          },
          "Creative Plus PS CAMO": {
            "exShowroomPrice": 1272000,
            "engineCC": 1199
          },
          "Creative Plus S Dark": {
            "exShowroomPrice": 1192000,
            "engineCC": 1199
          }
        }
      }
    },
    "Nexon EV": {
      "bodyType": "Compact SUV (Electric)",
      "fuelTypes": {
        "Electric": [
          "Creative",
          "Creative 45",
          "Creative Plus MR",
          "Dark Edition (EV)",
          "Empowered",
          "Empowered 45",
          "Empowered LR",
          "Empowered Plus A 45",
          "Empowered Plus A 45 Dark",
          "Empowered Plus A 45 Red Dark",
          "Empowered+",
          "Empowered+ LR",
          "Fearless 45",
          "Fearless MR",
          "XM",
          "XZ+"
        ]
      },
      "basePrice": 1249000,
      "variantPrices": {
        "Electric": {
          "Creative Plus MR": {
            "exShowroomPrice": 1249000
          },
          "Empowered Plus A 45": {
            "exShowroomPrice": 1769000
          },
          "Creative 45": {
            "exShowroomPrice": 1434000
          },
          "Fearless 45": {
            "exShowroomPrice": 1534000
          },
          "Empowered Plus A 45 Red Dark": {
            "exShowroomPrice": 1789000
          },
          "Empowered 45": {
            "exShowroomPrice": 1634000
          },
          "Empowered Plus A 45 Dark": {
            "exShowroomPrice": 1789000
          },
          "Fearless MR": {
            "exShowroomPrice": 1329000
          }
        }
      }
    },
    "Punch": {
      "bodyType": "Micro SUV",
      "fuelTypes": {
        "Petrol": [
          "Accomplished",
          "Accomplished AMT",
          "Accomplished Plus S",
          "Accomplished Plus S AMT",
          "Accomplished Plus S Turbo",
          "Adventure",
          "Adventure AMT",
          "Adventure S",
          "Adventure Turbo",
          "Camo Edition",
          "Creative",
          "Creative AMT",
          "Creative+",
          "Pure",
          "Pure Plus",
          "Pure Plus AMT",
          "Pure Plus S",
          "Pure Plus S AMT",
          "Smart"
        ],
        "CNG": [
          "Accomplished",
          "Accomplished Plus S AMT",
          "Adventure",
          "Adventure AMT",
          "Adventure S",
          "Adventure S AMT",
          "CNG (iCNG) variant",
          "Pure",
          "Pure Plus",
          "Pure Plus AMT",
          "Pure Plus S",
          "Smart"
        ]
      },
      "basePrice": 575000,
      "variantPrices": {
        "Petrol": {
          "Pure": {
            "exShowroomPrice": 665000,
            "engineCC": 1199
          },
          "Adventure S": {
            "exShowroomPrice": 812000,
            "engineCC": 1199
          },
          "Adventure Turbo": {
            "exShowroomPrice": 847000,
            "engineCC": 1199
          },
          "Adventure AMT": {
            "exShowroomPrice": 835000,
            "engineCC": 1199
          },
          "Pure Plus S AMT": {
            "exShowroomPrice": 810000,
            "engineCC": 1199
          },
          "Adventure": {
            "exShowroomPrice": 777000,
            "engineCC": 1199
          },
          "Accomplished Plus S AMT": {
            "exShowroomPrice": 975000,
            "engineCC": 1199
          },
          "Accomplished": {
            "exShowroomPrice": 847000,
            "engineCC": 1199
          },
          "Accomplished Plus S Turbo": {
            "exShowroomPrice": 997000,
            "engineCC": 1199
          },
          "Pure Plus S": {
            "exShowroomPrice": 752000,
            "engineCC": 1199
          },
          "Smart": {
            "exShowroomPrice": 575000,
            "engineCC": 1199
          },
          "Pure Plus AMT": {
            "exShowroomPrice": 775000,
            "engineCC": 1199
          },
          "Pure Plus": {
            "exShowroomPrice": 717000,
            "engineCC": 1199
          },
          "Accomplished AMT": {
            "exShowroomPrice": 905000,
            "engineCC": 1199
          },
          "Accomplished Plus S": {
            "exShowroomPrice": 917000,
            "engineCC": 1199
          }
        },
        "CNG": {
          "Pure Plus": {
            "exShowroomPrice": 820000,
            "engineCC": 1199
          },
          "Pure Plus AMT": {
            "exShowroomPrice": 877000,
            "engineCC": 1199
          },
          "Smart": {
            "exShowroomPrice": 685000,
            "engineCC": 1199
          },
          "Pure": {
            "exShowroomPrice": 768000,
            "engineCC": 1199
          },
          "Adventure": {
            "exShowroomPrice": 880000,
            "engineCC": 1199
          },
          "Accomplished Plus S AMT": {
            "exShowroomPrice": 1077000,
            "engineCC": 1199
          },
          "Adventure AMT": {
            "exShowroomPrice": 937000,
            "engineCC": 1199
          },
          "Pure Plus S": {
            "exShowroomPrice": 855000,
            "engineCC": 1199
          },
          "Adventure S AMT": {
            "exShowroomPrice": 972000,
            "engineCC": 1199
          },
          "Accomplished": {
            "exShowroomPrice": 950000,
            "engineCC": 1199
          },
          "Adventure S": {
            "exShowroomPrice": 915000,
            "engineCC": 1199
          }
        }
      }
    },
    "Punch EV": {
      "bodyType": "Electric",
      "fuelTypes": {
        "Electric": [
          "Smart Plus 40",
          "Smart Plus 30",
          "Adventure 40",
          "Smart 30",
          "Empowered Plus S 40",
          "Empowered 40"
        ]
      },
      "basePrice": 979000,
      "variantPrices": {
        "Electric": {
          "Smart Plus 40": {
            "exShowroomPrice": 1119000
          },
          "Smart Plus 30": {
            "exShowroomPrice": 1039000
          },
          "Adventure 40": {
            "exShowroomPrice": 1194000
          },
          "Smart 30": {
            "exShowroomPrice": 979000
          },
          "Empowered Plus S 40": {
            "exShowroomPrice": 1299000
          },
          "Empowered 40": {
            "exShowroomPrice": 1269000
          }
        }
      }
    },
    "Safari": {
      "bodyType": "SUV",
      "fuelTypes": {
        "Petrol": [
          "Accomplished Ultra",
          "Accomplished Ultra (1498 cc)",
          "Accomplished Ultra 6S",
          "Accomplished Ultra 6S (1498 cc)",
          "Accomplished Ultra 6S AT",
          "Accomplished Ultra 6S AT (1498 cc)",
          "Accomplished Ultra 6S DARK",
          "Accomplished Ultra 6S Dark (1498 cc)",
          "Accomplished Ultra 6S DARK AT",
          "Accomplished Ultra 6S Dark AT (1498 cc)",
          "Accomplished Ultra 6S Stealth AT",
          "Accomplished Ultra 6S Stealth AT (1498 cc)",
          "Accomplished Ultra AT",
          "Accomplished Ultra AT (1498 cc)",
          "Accomplished Ultra DARK",
          "Accomplished Ultra Dark (1498 cc)",
          "Accomplished Ultra DARK AT",
          "Accomplished Ultra Dark AT (1498 cc)",
          "Accomplished Ultra Red DARK",
          "Accomplished Ultra Red Dark (1498 cc)",
          "Accomplished Ultra Red DARK 6S",
          "Accomplished Ultra Red Dark 6S (1498 cc)",
          "Accomplished Ultra Red DARK 6S AT",
          "Accomplished Ultra Red Dark 6S AT (1498 cc)",
          "Accomplished Ultra Red DARK AT",
          "Accomplished Ultra Red Dark AT (1498 cc)",
          "Accomplished Ultra Stealth",
          "Accomplished Ultra Stealth (1498 cc)",
          "Accomplished Ultra Stealth AT",
          "Accomplished Ultra Stealth AT (1498 cc)",
          "Accomplished X",
          "Accomplished X (1498 cc)",
          "Accomplished X AT",
          "Accomplished X AT (1498 cc)",
          "Accomplished X DARK",
          "Accomplished X Dark (1498 cc)",
          "Accomplished X DARK AT",
          "Accomplished X Dark AT (1498 cc)",
          "Accomplished X Plus",
          "Accomplished X Plus (1498 cc)",
          "Accomplished X Plus 6S",
          "Accomplished X Plus 6S (1498 cc)",
          "Accomplished X Plus 6S AT",
          "Accomplished X Plus 6S AT (1498 cc)",
          "Accomplished X Plus 6S DARK",
          "Accomplished X Plus 6S Dark (1498 cc)",
          "Accomplished X Plus 6S DARK AT",
          "Accomplished X Plus 6S Dark AT (1498 cc)",
          "Accomplished X Plus AT",
          "Accomplished X Plus AT (1498 cc)",
          "Accomplished X Plus DARK",
          "Accomplished X Plus Dark (1498 cc)",
          "Accomplished X Plus DARK AT",
          "Accomplished X Plus Dark AT (1498 cc)",
          "Adventure X Plus",
          "Adventure X Plus (1498 cc)",
          "Adventure X Plus AT",
          "Adventure X Plus AT (1498 cc)",
          "Adventure X Plus DARK",
          "Adventure X Plus Dark (1498 cc)",
          "Adventure X Plus DARK AT",
          "Adventure X Plus Dark AT (1498 cc)",
          "EX Petrol",
          "Pure X",
          "Pure X (1498 cc)",
          "Pure X AT",
          "Pure X AT (1498 cc)",
          "Pure X DARK",
          "Pure X Dark (1498 cc)",
          "Pure X DARK AT",
          "Pure X Dark AT (1498 cc)",
          "Smart",
          "Smart (1498 cc)"
        ],
        "Diesel": [
          "Accomplished",
          "Accomplished Ultra",
          "Accomplished Ultra (1956 cc)",
          "Accomplished Ultra 6S",
          "Accomplished Ultra 6S (1956 cc)",
          "Accomplished Ultra 6S AT",
          "Accomplished Ultra 6S AT (1956 cc)",
          "Accomplished Ultra 6S DARK AT",
          "Accomplished Ultra 6S Dark AT (1956 cc)",
          "Accomplished Ultra 6S Stealth AT",
          "Accomplished Ultra 6S Stealth AT (1956 cc)",
          "Accomplished Ultra AT",
          "Accomplished Ultra AT (1956 cc)",
          "Accomplished Ultra DARK",
          "Accomplished Ultra Dark (1956 cc)",
          "Accomplished Ultra DARK 6S",
          "Accomplished Ultra Dark 6S (1956 cc)",
          "Accomplished Ultra DARK AT",
          "Accomplished Ultra Dark AT (1956 cc)",
          "Accomplished Ultra Red DARK",
          "Accomplished Ultra Red Dark (1956 cc)",
          "Accomplished Ultra Red Dark 6S",
          "Accomplished Ultra Red Dark 6S (1956 cc)",
          "Accomplished Ultra Red Dark 6S AT",
          "Accomplished Ultra Red Dark 6S AT (1956 cc)",
          "Accomplished Ultra Red Dark AT",
          "Accomplished Ultra Red Dark AT (1956 cc)",
          "Accomplished Ultra Stealth",
          "Accomplished Ultra Stealth (1956 cc)",
          "Accomplished Ultra Stealth AT",
          "Accomplished Ultra Stealth AT (1956 cc)",
          "Accomplished X",
          "Accomplished X (1956 cc)",
          "Accomplished X AT",
          "Accomplished X AT (1956 cc)",
          "Accomplished X Dark",
          "Accomplished X Dark (1956 cc)",
          "Accomplished X Dark AT",
          "Accomplished X Dark AT (1956 cc)",
          "Accomplished X Plus",
          "Accomplished X Plus (1956 cc)",
          "Accomplished X Plus 6S",
          "Accomplished X Plus 6S (1956 cc)",
          "Accomplished X Plus 6S AT",
          "Accomplished X Plus 6S AT (1956 cc)",
          "Accomplished X Plus 6S Dark",
          "Accomplished X Plus 6S Dark (1956 cc)",
          "Accomplished X Plus 6S Dark AT",
          "Accomplished X Plus 6S Dark AT (1956 cc)",
          "Accomplished X Plus AT",
          "Accomplished X Plus AT (1956 cc)",
          "Accomplished X Plus Dark",
          "Accomplished X Plus Dark (1956 cc)",
          "Accomplished X Plus Dark AT",
          "Accomplished X Plus Dark AT (1956 cc)",
          "Accomplished+",
          "Adventure",
          "Adventure Persona",
          "Adventure X Plus",
          "Adventure X Plus (1956 cc)",
          "Adventure X Plus AT",
          "Adventure X Plus AT (1956 cc)",
          "Adventure X Plus Dark",
          "Adventure X Plus Dark (1956 cc)",
          "Adventure X Plus Dark AT",
          "Adventure X Plus Dark AT (1956 cc)",
          "Dark Edition",
          "EX",
          "EX 4x2",
          "EX 4x4",
          "Fearless",
          "Fearless+",
          "Gold Edition",
          "GX",
          "Limited/Anniversary/Adventure special editions",
          "LX",
          "LX 4x2",
          "LX 4x4",
          "Pure",
          "Pure X",
          "Pure X (1956 cc)",
          "Pure X AT",
          "Pure X AT (1956 cc)",
          "Pure X Dark",
          "Pure X Dark (1956 cc)",
          "Pure X Dark AT",
          "Pure X Dark AT (1956 cc)",
          "Red Dark Edition",
          "Smart",
          "Smart (1956 cc)",
          "Stealth Edition",
          "XE",
          "XM",
          "XT",
          "XZ",
          "XZ+",
          "XZA+",
          "XZA+ 4WD"
        ]
      },
      "basePrice": 1340000,
      "variantPrices": {
        "Petrol": {
          "Adventure X Plus AT (1498 cc)": {
            "exShowroomPrice": 1980000,
            "engineCC": 1498
          },
          "Accomplished X Plus 6S Dark AT (1498 cc)": {
            "exShowroomPrice": 2495000,
            "engineCC": 1498
          },
          "Pure X AT (1498 cc)": {
            "exShowroomPrice": 1835000,
            "engineCC": 1498
          },
          "Accomplished X (1498 cc)": {
            "exShowroomPrice": 2130000,
            "engineCC": 1498
          },
          "Accomplished X AT (1498 cc)": {
            "exShowroomPrice": 2130000,
            "engineCC": 1498
          },
          "Accomplished X Plus 6S AT (1498 cc)": {
            "exShowroomPrice": 2130000,
            "engineCC": 1498
          },
          "Accomplished X Plus 6S (1498 cc)": {
            "exShowroomPrice": 2130000,
            "engineCC": 1498
          },
          "Accomplished Ultra 6S AT (1498 cc)": {
            "exShowroomPrice": 2520000,
            "engineCC": 1498
          },
          "Accomplished X Dark AT (1498 cc)": {
            "exShowroomPrice": 2130000,
            "engineCC": 1498
          },
          "Accomplished Ultra 6S (1498 cc)": {
            "exShowroomPrice": 2375000,
            "engineCC": 1498
          },
          "Accomplished Ultra Red Dark 6S AT (1498 cc)": {
            "exShowroomPrice": 2555000,
            "engineCC": 1498
          },
          "Accomplished X Plus AT (1498 cc)": {
            "exShowroomPrice": 2130000,
            "engineCC": 1498
          },
          "Accomplished X Plus Dark AT (1498 cc)": {
            "exShowroomPrice": 2130000,
            "engineCC": 1498
          },
          "Accomplished X Plus 6S Dark (1498 cc)": {
            "exShowroomPrice": 2130000,
            "engineCC": 1498
          },
          "Adventure X Plus Dark (1498 cc)": {
            "exShowroomPrice": 1870000,
            "engineCC": 1498
          },
          "Accomplished Ultra Stealth (1498 cc)": {
            "exShowroomPrice": 2426000,
            "engineCC": 1498
          },
          "Pure X Dark (1498 cc)": {
            "exShowroomPrice": 1735000,
            "engineCC": 1498
          },
          "Accomplished X Plus Dark (1498 cc)": {
            "exShowroomPrice": 2130000,
            "engineCC": 1498
          },
          "Accomplished X Dark (1498 cc)": {
            "exShowroomPrice": 2130000,
            "engineCC": 1498
          },
          "Pure X (1498 cc)": {
            "exShowroomPrice": 1685000,
            "engineCC": 1498
          },
          "Accomplished X Plus (1498 cc)": {
            "exShowroomPrice": 2130000,
            "engineCC": 1498
          },
          "Accomplished Ultra (1498 cc)": {
            "exShowroomPrice": 2365000,
            "engineCC": 1498
          },
          "Accomplished Ultra AT (1498 cc)": {
            "exShowroomPrice": 2365000,
            "engineCC": 1498
          },
          "Accomplished Ultra 6S Dark AT (1498 cc)": {
            "exShowroomPrice": 2375000,
            "engineCC": 1498
          },
          "Accomplished Ultra Red Dark 6S (1498 cc)": {
            "exShowroomPrice": 2365000,
            "engineCC": 1498
          },
          "Accomplished Ultra Red Dark AT (1498 cc)": {
            "exShowroomPrice": 2365000,
            "engineCC": 1498
          },
          "Accomplished Ultra Dark AT (1498 cc)": {
            "exShowroomPrice": 2365000,
            "engineCC": 1498
          },
          "Smart (1498 cc)": {
            "exShowroomPrice": 1340000,
            "engineCC": 1498
          },
          "Accomplished Ultra Dark (1498 cc)": {
            "exShowroomPrice": 2365000,
            "engineCC": 1498
          },
          "Adventure X Plus Dark AT (1498 cc)": {
            "exShowroomPrice": 1870000,
            "engineCC": 1498
          },
          "Pure X Dark AT (1498 cc)": {
            "exShowroomPrice": 1735000,
            "engineCC": 1498
          },
          "Accomplished Ultra Red Dark (1498 cc)": {
            "exShowroomPrice": 2365000,
            "engineCC": 1498
          },
          "Adventure X Plus (1498 cc)": {
            "exShowroomPrice": 1815000,
            "engineCC": 1498
          },
          "Accomplished Ultra 6S Dark (1498 cc)": {
            "exShowroomPrice": 2375000,
            "engineCC": 1498
          },
          "Accomplished Ultra 6S Stealth AT (1498 cc)": {
            "exShowroomPrice": 2375000,
            "engineCC": 1498
          },
          "Accomplished Ultra Stealth AT (1498 cc)": {
            "exShowroomPrice": 2426000,
            "engineCC": 1498
          },
          "Accomplished Ultra": {
            "exShowroomPrice": 2365000,
            "engineCC": 1498,
            "source": "existing_variant_price_alias"
          },
          "Accomplished Ultra 6S": {
            "exShowroomPrice": 2375000,
            "engineCC": 1498,
            "source": "existing_variant_price_alias"
          },
          "Accomplished Ultra 6S AT": {
            "exShowroomPrice": 2520000,
            "engineCC": 1498,
            "source": "existing_variant_price_alias"
          },
          "Accomplished Ultra 6S DARK": {
            "exShowroomPrice": 2375000,
            "engineCC": 1498,
            "source": "existing_variant_price_alias"
          },
          "Accomplished Ultra 6S DARK AT": {
            "exShowroomPrice": 2375000,
            "engineCC": 1498,
            "source": "existing_variant_price_alias"
          },
          "Accomplished Ultra 6S Stealth AT": {
            "exShowroomPrice": 2375000,
            "engineCC": 1498,
            "source": "existing_variant_price_alias"
          },
          "Accomplished Ultra AT": {
            "exShowroomPrice": 2365000,
            "engineCC": 1498,
            "source": "existing_variant_price_alias"
          },
          "Accomplished Ultra DARK": {
            "exShowroomPrice": 2365000,
            "engineCC": 1498,
            "source": "existing_variant_price_alias"
          },
          "Accomplished Ultra DARK AT": {
            "exShowroomPrice": 2365000,
            "engineCC": 1498,
            "source": "existing_variant_price_alias"
          },
          "Accomplished Ultra Red DARK": {
            "exShowroomPrice": 2365000,
            "engineCC": 1498,
            "source": "existing_variant_price_alias"
          },
          "Accomplished Ultra Red DARK 6S": {
            "exShowroomPrice": 2365000,
            "engineCC": 1498,
            "source": "existing_variant_price_alias"
          },
          "Accomplished Ultra Red DARK 6S AT": {
            "exShowroomPrice": 2555000,
            "engineCC": 1498,
            "source": "existing_variant_price_alias"
          },
          "Accomplished Ultra Red DARK AT": {
            "exShowroomPrice": 2365000,
            "engineCC": 1498,
            "source": "existing_variant_price_alias"
          },
          "Accomplished Ultra Stealth": {
            "exShowroomPrice": 2426000,
            "engineCC": 1498,
            "source": "existing_variant_price_alias"
          },
          "Accomplished Ultra Stealth AT": {
            "exShowroomPrice": 2426000,
            "engineCC": 1498,
            "source": "existing_variant_price_alias"
          },
          "Accomplished X": {
            "exShowroomPrice": 2130000,
            "engineCC": 1498,
            "source": "existing_variant_price_alias"
          },
          "Accomplished X AT": {
            "exShowroomPrice": 2130000,
            "engineCC": 1498,
            "source": "existing_variant_price_alias"
          },
          "Accomplished X DARK": {
            "exShowroomPrice": 2130000,
            "engineCC": 1498,
            "source": "existing_variant_price_alias"
          },
          "Accomplished X DARK AT": {
            "exShowroomPrice": 2130000,
            "engineCC": 1498,
            "source": "existing_variant_price_alias"
          },
          "Accomplished X Plus": {
            "exShowroomPrice": 2130000,
            "engineCC": 1498,
            "source": "existing_variant_price_alias"
          },
          "Accomplished X Plus 6S": {
            "exShowroomPrice": 2130000,
            "engineCC": 1498,
            "source": "existing_variant_price_alias"
          },
          "Accomplished X Plus 6S AT": {
            "exShowroomPrice": 2130000,
            "engineCC": 1498,
            "source": "existing_variant_price_alias"
          },
          "Accomplished X Plus 6S DARK": {
            "exShowroomPrice": 2130000,
            "engineCC": 1498,
            "source": "existing_variant_price_alias"
          },
          "Accomplished X Plus 6S DARK AT": {
            "exShowroomPrice": 2495000,
            "engineCC": 1498,
            "source": "existing_variant_price_alias"
          },
          "Accomplished X Plus AT": {
            "exShowroomPrice": 2130000,
            "engineCC": 1498,
            "source": "existing_variant_price_alias"
          },
          "Accomplished X Plus DARK": {
            "exShowroomPrice": 2130000,
            "engineCC": 1498,
            "source": "existing_variant_price_alias"
          },
          "Accomplished X Plus DARK AT": {
            "exShowroomPrice": 2130000,
            "engineCC": 1498,
            "source": "existing_variant_price_alias"
          },
          "Adventure X Plus": {
            "exShowroomPrice": 1815000,
            "engineCC": 1498,
            "source": "existing_variant_price_alias"
          },
          "Adventure X Plus AT": {
            "exShowroomPrice": 1980000,
            "engineCC": 1498,
            "source": "existing_variant_price_alias"
          },
          "Adventure X Plus DARK": {
            "exShowroomPrice": 1870000,
            "engineCC": 1498,
            "source": "existing_variant_price_alias"
          },
          "Adventure X Plus DARK AT": {
            "exShowroomPrice": 1870000,
            "engineCC": 1498,
            "source": "existing_variant_price_alias"
          },
          "Pure X": {
            "exShowroomPrice": 1685000,
            "engineCC": 1498,
            "source": "existing_variant_price_alias"
          },
          "Pure X AT": {
            "exShowroomPrice": 1835000,
            "engineCC": 1498,
            "source": "existing_variant_price_alias"
          },
          "Pure X DARK": {
            "exShowroomPrice": 1735000,
            "engineCC": 1498,
            "source": "existing_variant_price_alias"
          },
          "Pure X DARK AT": {
            "exShowroomPrice": 1735000,
            "engineCC": 1498,
            "source": "existing_variant_price_alias"
          },
          "Smart": {
            "exShowroomPrice": 1340000,
            "engineCC": 1498,
            "source": "existing_variant_price_alias"
          }
        },
        "Diesel": {
          "Accomplished Ultra Dark (1956 cc)": {
            "exShowroomPrice": 2500000,
            "engineCC": 1956
          },
          "Accomplished X Plus 6S Dark AT (1956 cc)": {
            "exShowroomPrice": 2605000,
            "engineCC": 1956
          },
          "Accomplished Ultra AT (1956 cc)": {
            "exShowroomPrice": 2620000,
            "engineCC": 1956
          },
          "Accomplished X (1956 cc)": {
            "exShowroomPrice": 2235000,
            "engineCC": 1956
          },
          "Accomplished Ultra 6S (1956 cc)": {
            "exShowroomPrice": 2485000,
            "engineCC": 1956
          },
          "Accomplished Ultra (1956 cc)": {
            "exShowroomPrice": 2475000,
            "engineCC": 1956
          },
          "Accomplished Ultra Dark 6S (1956 cc)": {
            "exShowroomPrice": 2500000,
            "engineCC": 1956
          },
          "Accomplished X AT (1956 cc)": {
            "exShowroomPrice": 2235000,
            "engineCC": 1956
          },
          "Pure X (1956 cc)": {
            "exShowroomPrice": 1795000,
            "engineCC": 1956
          },
          "Accomplished Ultra Stealth AT (1956 cc)": {
            "exShowroomPrice": 2475000,
            "engineCC": 1956
          },
          "Accomplished X Dark AT (1956 cc)": {
            "exShowroomPrice": 2235000,
            "engineCC": 1956
          },
          "Adventure X Plus AT (1956 cc)": {
            "exShowroomPrice": 2105000,
            "engineCC": 1956
          },
          "Pure X Dark AT (1956 cc)": {
            "exShowroomPrice": 1795000,
            "engineCC": 1956
          },
          "Accomplished X Plus Dark AT (1956 cc)": {
            "exShowroomPrice": 2235000,
            "engineCC": 1956
          },
          "Accomplished Ultra Stealth (1956 cc)": {
            "exShowroomPrice": 2475000,
            "engineCC": 1956
          },
          "Accomplished Ultra Dark AT (1956 cc)": {
            "exShowroomPrice": 2500000,
            "engineCC": 1956
          },
          "Accomplished X Plus Dark (1956 cc)": {
            "exShowroomPrice": 2235000,
            "engineCC": 1956
          },
          "Accomplished X Plus (1956 cc)": {
            "exShowroomPrice": 2235000,
            "engineCC": 1956
          },
          "Smart (1956 cc)": {
            "exShowroomPrice": 1485000,
            "engineCC": 1956
          },
          "Accomplished Ultra 6S Dark AT (1956 cc)": {
            "exShowroomPrice": 2485000,
            "engineCC": 1956
          },
          "Accomplished Ultra Red Dark 6S (1956 cc)": {
            "exShowroomPrice": 2475000,
            "engineCC": 1956
          },
          "Accomplished Ultra Red Dark (1956 cc)": {
            "exShowroomPrice": 2475000,
            "engineCC": 1956
          },
          "Adventure X Plus Dark AT (1956 cc)": {
            "exShowroomPrice": 2160000,
            "engineCC": 1956
          },
          "Pure X Dark (1956 cc)": {
            "exShowroomPrice": 1795000,
            "engineCC": 1956
          },
          "Pure X AT (1956 cc)": {
            "exShowroomPrice": 1795000,
            "engineCC": 1956
          },
          "Accomplished X Plus 6S AT (1956 cc)": {
            "exShowroomPrice": 2235000,
            "engineCC": 1956
          },
          "Accomplished Ultra Red Dark AT (1956 cc)": {
            "exShowroomPrice": 2475000,
            "engineCC": 1956
          },
          "Accomplished X Plus 6S (1956 cc)": {
            "exShowroomPrice": 2235000,
            "engineCC": 1956
          },
          "Accomplished X Plus 6S Dark (1956 cc)": {
            "exShowroomPrice": 2235000,
            "engineCC": 1956
          },
          "Accomplished X Dark (1956 cc)": {
            "exShowroomPrice": 2235000,
            "engineCC": 1956
          },
          "Adventure X Plus Dark (1956 cc)": {
            "exShowroomPrice": 1995000,
            "engineCC": 1956
          },
          "Adventure X Plus (1956 cc)": {
            "exShowroomPrice": 1940000,
            "engineCC": 1956
          },
          "Accomplished Ultra 6S AT (1956 cc)": {
            "exShowroomPrice": 2485000,
            "engineCC": 1956
          },
          "Accomplished Ultra 6S Stealth AT (1956 cc)": {
            "exShowroomPrice": 2485000,
            "engineCC": 1956
          },
          "Accomplished Ultra Red Dark 6S AT (1956 cc)": {
            "exShowroomPrice": 2475000,
            "engineCC": 1956
          },
          "Accomplished X Plus AT (1956 cc)": {
            "exShowroomPrice": 2235000,
            "engineCC": 1956
          },
          "Accomplished Ultra": {
            "exShowroomPrice": 2475000,
            "engineCC": 1956,
            "source": "existing_variant_price_alias"
          },
          "Accomplished Ultra 6S": {
            "exShowroomPrice": 2485000,
            "engineCC": 1956,
            "source": "existing_variant_price_alias"
          },
          "Accomplished Ultra 6S AT": {
            "exShowroomPrice": 2485000,
            "engineCC": 1956,
            "source": "existing_variant_price_alias"
          },
          "Accomplished Ultra 6S DARK AT": {
            "exShowroomPrice": 2485000,
            "engineCC": 1956,
            "source": "existing_variant_price_alias"
          },
          "Accomplished Ultra 6S Stealth AT": {
            "exShowroomPrice": 2485000,
            "engineCC": 1956,
            "source": "existing_variant_price_alias"
          },
          "Accomplished Ultra AT": {
            "exShowroomPrice": 2620000,
            "engineCC": 1956,
            "source": "existing_variant_price_alias"
          },
          "Accomplished Ultra DARK": {
            "exShowroomPrice": 2500000,
            "engineCC": 1956,
            "source": "existing_variant_price_alias"
          },
          "Accomplished Ultra DARK 6S": {
            "exShowroomPrice": 2500000,
            "engineCC": 1956,
            "source": "existing_variant_price_alias"
          },
          "Accomplished Ultra DARK AT": {
            "exShowroomPrice": 2500000,
            "engineCC": 1956,
            "source": "existing_variant_price_alias"
          },
          "Accomplished Ultra Red DARK": {
            "exShowroomPrice": 2475000,
            "engineCC": 1956,
            "source": "existing_variant_price_alias"
          },
          "Accomplished Ultra Red Dark 6S": {
            "exShowroomPrice": 2475000,
            "engineCC": 1956,
            "source": "existing_variant_price_alias"
          },
          "Accomplished Ultra Red Dark 6S AT": {
            "exShowroomPrice": 2475000,
            "engineCC": 1956,
            "source": "existing_variant_price_alias"
          },
          "Accomplished Ultra Red Dark AT": {
            "exShowroomPrice": 2475000,
            "engineCC": 1956,
            "source": "existing_variant_price_alias"
          },
          "Accomplished Ultra Stealth": {
            "exShowroomPrice": 2475000,
            "engineCC": 1956,
            "source": "existing_variant_price_alias"
          },
          "Accomplished Ultra Stealth AT": {
            "exShowroomPrice": 2475000,
            "engineCC": 1956,
            "source": "existing_variant_price_alias"
          },
          "Accomplished X": {
            "exShowroomPrice": 2235000,
            "engineCC": 1956,
            "source": "existing_variant_price_alias"
          },
          "Accomplished X AT": {
            "exShowroomPrice": 2235000,
            "engineCC": 1956,
            "source": "existing_variant_price_alias"
          },
          "Accomplished X Dark": {
            "exShowroomPrice": 2235000,
            "engineCC": 1956,
            "source": "existing_variant_price_alias"
          },
          "Accomplished X Dark AT": {
            "exShowroomPrice": 2235000,
            "engineCC": 1956,
            "source": "existing_variant_price_alias"
          },
          "Accomplished X Plus": {
            "exShowroomPrice": 2235000,
            "engineCC": 1956,
            "source": "existing_variant_price_alias"
          },
          "Accomplished X Plus 6S": {
            "exShowroomPrice": 2235000,
            "engineCC": 1956,
            "source": "existing_variant_price_alias"
          },
          "Accomplished X Plus 6S AT": {
            "exShowroomPrice": 2235000,
            "engineCC": 1956,
            "source": "existing_variant_price_alias"
          },
          "Accomplished X Plus 6S Dark": {
            "exShowroomPrice": 2235000,
            "engineCC": 1956,
            "source": "existing_variant_price_alias"
          },
          "Accomplished X Plus 6S Dark AT": {
            "exShowroomPrice": 2605000,
            "engineCC": 1956,
            "source": "existing_variant_price_alias"
          },
          "Accomplished X Plus AT": {
            "exShowroomPrice": 2235000,
            "engineCC": 1956,
            "source": "existing_variant_price_alias"
          },
          "Accomplished X Plus Dark": {
            "exShowroomPrice": 2235000,
            "engineCC": 1956,
            "source": "existing_variant_price_alias"
          },
          "Accomplished X Plus Dark AT": {
            "exShowroomPrice": 2235000,
            "engineCC": 1956,
            "source": "existing_variant_price_alias"
          },
          "Adventure X Plus": {
            "exShowroomPrice": 1940000,
            "engineCC": 1956,
            "source": "existing_variant_price_alias"
          },
          "Adventure X Plus AT": {
            "exShowroomPrice": 2105000,
            "engineCC": 1956,
            "source": "existing_variant_price_alias"
          },
          "Adventure X Plus Dark": {
            "exShowroomPrice": 1995000,
            "engineCC": 1956,
            "source": "existing_variant_price_alias"
          },
          "Adventure X Plus Dark AT": {
            "exShowroomPrice": 2160000,
            "engineCC": 1956,
            "source": "existing_variant_price_alias"
          },
          "Pure X": {
            "exShowroomPrice": 1795000,
            "engineCC": 1956,
            "source": "existing_variant_price_alias"
          },
          "Pure X AT": {
            "exShowroomPrice": 1795000,
            "engineCC": 1956,
            "source": "existing_variant_price_alias"
          },
          "Pure X Dark": {
            "exShowroomPrice": 1795000,
            "engineCC": 1956,
            "source": "existing_variant_price_alias"
          },
          "Pure X Dark AT": {
            "exShowroomPrice": 1795000,
            "engineCC": 1956,
            "source": "existing_variant_price_alias"
          },
          "Smart": {
            "exShowroomPrice": 1485000,
            "engineCC": 1956,
            "source": "existing_variant_price_alias"
          }
        }
      }
    },
    "Sierra": {
      "bodyType": "SUV",
      "fuelTypes": {
        "Diesel": [
          "Accomplished",
          "Accomplished AT",
          "Accomplished Plus",
          "Accomplished Plus AT",
          "Adventure",
          "Adventure Plus",
          "Adventure Plus AT",
          "Pure",
          "Pure AT",
          "Pure Plus",
          "Pure Plus AT",
          "Smart Plus",
          "Trim ladder not confirmed"
        ],
        "Petrol": [
          "Accomplished",
          "Accomplished Plus Turbo",
          "Accomplished Turbo",
          "Adventure",
          "Adventure DCA",
          "Adventure Plus",
          "Adventure Plus Turbo",
          "Pure",
          "Pure DCA",
          "Pure Plus",
          "Pure Plus DCA",
          "Smart Plus",
          "Trim ladder not confirmed"
        ]
      },
      "basePrice": 1149000,
      "variantPrices": {
        "Diesel": {
          "Accomplished AT": {
            "exShowroomPrice": 1999000,
            "engineCC": 1497
          },
          "Pure Plus AT": {
            "exShowroomPrice": 1749000,
            "engineCC": 1497
          },
          "Pure AT": {
            "exShowroomPrice": 1599000,
            "engineCC": 1497
          },
          "Pure Plus": {
            "exShowroomPrice": 1609000,
            "engineCC": 1497
          },
          "Adventure Plus": {
            "exShowroomPrice": 1734000,
            "engineCC": 1497
          },
          "Adventure Plus AT": {
            "exShowroomPrice": 1864000,
            "engineCC": 1497
          },
          "Pure": {
            "exShowroomPrice": 1459000,
            "engineCC": 1497
          },
          "Accomplished Plus": {
            "exShowroomPrice": 2029000,
            "engineCC": 1497
          },
          "Smart Plus": {
            "exShowroomPrice": 1299000,
            "engineCC": 1497
          },
          "Accomplished": {
            "exShowroomPrice": 1899000,
            "engineCC": 1497
          },
          "Adventure": {
            "exShowroomPrice": 1664000,
            "engineCC": 1497
          },
          "Accomplished Plus AT": {
            "exShowroomPrice": 2129000,
            "engineCC": 1497
          }
        },
        "Petrol": {
          "Pure Plus": {
            "exShowroomPrice": 1464000,
            "engineCC": 1498
          },
          "Adventure Plus": {
            "exShowroomPrice": 1614000,
            "engineCC": 1498
          },
          "Pure DCA": {
            "exShowroomPrice": 1449000,
            "engineCC": 1498
          },
          "Accomplished Turbo": {
            "exShowroomPrice": 1999000,
            "engineCC": 1498
          },
          "Adventure Plus Turbo": {
            "exShowroomPrice": 1814000,
            "engineCC": 1498
          },
          "Adventure": {
            "exShowroomPrice": 1544000,
            "engineCC": 1498
          },
          "Accomplished": {
            "exShowroomPrice": 1799000,
            "engineCC": 1498
          },
          "Pure Plus DCA": {
            "exShowroomPrice": 1599000,
            "engineCC": 1498
          },
          "Pure": {
            "exShowroomPrice": 1314000,
            "engineCC": 1498
          },
          "Accomplished Plus Turbo": {
            "exShowroomPrice": 2099000,
            "engineCC": 1498
          },
          "Adventure DCA": {
            "exShowroomPrice": 1679000,
            "engineCC": 1498
          },
          "Smart Plus": {
            "exShowroomPrice": 1149000,
            "engineCC": 1498
          }
        }
      }
    },
    "Sierra EV": {
      "bodyType": "SUV",
      "fuelTypes": {
        "Electric": [
          "Adventure 63 RWD",
          "Adventure 63 RWD ACFC",
          "Adventure 75 RWD",
          "Adventure 75 RWD ACFC",
          "Empowered 63 RWD",
          "Empowered 63 RWD ACFC",
          "Empowered 75 RWD",
          "Empowered 75 RWD ACFC",
          "Empowered A 75 AWD",
          "Empowered A 75 AWD ACFC",
          "Empowered A 75 RWD",
          "Empowered A 75 RWD ACFC",
          "Pure 63 RWD",
          "Pure 63 RWD ACFC",
          "Pure S 63 RWD",
          "Pure S 63 RWD ACFC",
          "TBC"
        ]
      },
      "basePrice": 1879000,
      "variantPrices": {
        "Electric": {
          "Empowered A 75 RWD": {
            "exShowroomPrice": 2479000
          },
          "Adventure 75 RWD ACFC": {
            "exShowroomPrice": 2268000
          },
          "Adventure 75 RWD": {
            "exShowroomPrice": 2219000
          },
          "Adventure 63 RWD ACFC": {
            "exShowroomPrice": 2148000
          },
          "Adventure 63 RWD": {
            "exShowroomPrice": 2099000
          },
          "Empowered 75 RWD ACFC": {
            "exShowroomPrice": 2428000
          },
          "Empowered 63 RWD": {
            "exShowroomPrice": 2279000
          },
          "Empowered 75 RWD": {
            "exShowroomPrice": 2379000
          },
          "Empowered A 75 AWD": {
            "exShowroomPrice": 2599000
          },
          "Pure S 63 RWD": {
            "exShowroomPrice": 1999000
          },
          "Pure 63 RWD ACFC": {
            "exShowroomPrice": 1928000
          },
          "Pure S 63 RWD ACFC": {
            "exShowroomPrice": 2048000
          },
          "Empowered 63 RWD ACFC": {
            "exShowroomPrice": 2328000
          },
          "Empowered A 75 RWD ACFC": {
            "exShowroomPrice": 2528000
          },
          "Empowered A 75 AWD ACFC": {
            "exShowroomPrice": 2648000
          },
          "Pure 63 RWD": {
            "exShowroomPrice": 1879000
          }
        }
      }
    },
    "Tiago": {
      "bodyType": "Hatchback",
      "fuelTypes": {
        "Petrol": [
          "Creative",
          "Creative AMT",
          "Creative Plus",
          "Creative Plus AMT",
          "JTP",
          "NRG",
          "NRG+",
          "Pure",
          "Pure AMT",
          "Pure Plus",
          "Pure Plus A",
          "Pure Plus A AMT",
          "Pure Plus AMT",
          "Smart",
          "XE",
          "XM",
          "XT",
          "XZ",
          "XZ+",
          "XZ+ AMT / XTA"
        ],
        "CNG": [
          "Creative",
          "Creative AMT",
          "Pure",
          "Pure AMT",
          "Pure Plus",
          "Pure Plus A",
          "Pure Plus A AMT",
          "Pure Plus AMT",
          "Smart",
          "XZ+ CNG / iCNG variant"
        ],
        "Diesel": [
          "XE",
          "XM",
          "XT",
          "XZ",
          "XZ+"
        ]
      },
      "basePrice": 477000,
      "variantPrices": {
        "Petrol": {
          "Pure Plus AMT": {
            "exShowroomPrice": 665000,
            "engineCC": 1199
          },
          "Creative Plus AMT": {
            "exShowroomPrice": 791000,
            "engineCC": 1199
          },
          "Creative Plus": {
            "exShowroomPrice": 736000,
            "engineCC": 1199
          },
          "Creative": {
            "exShowroomPrice": 761000,
            "engineCC": 1199
          },
          "Pure AMT": {
            "exShowroomPrice": 610000,
            "engineCC": 1199
          },
          "Creative AMT": {
            "exShowroomPrice": 706000,
            "engineCC": 1199
          },
          "Pure Plus": {
            "exShowroomPrice": 610000,
            "engineCC": 1199
          },
          "Pure": {
            "exShowroomPrice": 557000,
            "engineCC": 1199
          },
          "Pure Plus A AMT": {
            "exShowroomPrice": 711000,
            "engineCC": 1199
          },
          "Pure Plus A": {
            "exShowroomPrice": 656000,
            "engineCC": 1199
          },
          "Smart": {
            "exShowroomPrice": 477000,
            "engineCC": 1199
          }
        },
        "CNG": {
          "Creative AMT": {
            "exShowroomPrice": 862000,
            "engineCC": 1199
          },
          "Creative": {
            "exShowroomPrice": 807000,
            "engineCC": 1197
          },
          "Pure AMT": {
            "exShowroomPrice": 713000,
            "engineCC": 1199
          },
          "Smart": {
            "exShowroomPrice": 587000,
            "engineCC": 1199
          },
          "Pure Plus A AMT": {
            "exShowroomPrice": 812000,
            "engineCC": 1199
          },
          "Pure Plus A": {
            "exShowroomPrice": 757000,
            "engineCC": 1199
          },
          "Pure": {
            "exShowroomPrice": 658000,
            "engineCC": 1199
          },
          "Pure Plus": {
            "exShowroomPrice": 710000,
            "engineCC": 1199
          },
          "Pure Plus AMT": {
            "exShowroomPrice": 765000,
            "engineCC": 1199
          }
        },
        "Diesel": {}
      }
    },
    "Tiago EV": {
      "bodyType": "Hatchback",
      "fuelTypes": {
        "Electric": [
          "Creative Plus 24 Long Range",
          "Pure Plus 19 Medium Range",
          "Pure Plus 24 Long Range",
          "Smart 19 Medium Range",
          "XE",
          "XM",
          "XT",
          "XZ+"
        ]
      },
      "basePrice": 699000,
      "variantPrices": {
        "Electric": {
          "Smart 19 Medium Range": {
            "exShowroomPrice": 699000
          },
          "Creative Plus 24 Long Range": {
            "exShowroomPrice": 1009000
          },
          "Pure Plus 24 Long Range": {
            "exShowroomPrice": 964000
          },
          "Pure Plus 19 Medium Range": {
            "exShowroomPrice": 864000
          }
        }
      }
    },
    "Tigor": {
      "bodyType": "Compact Sedan",
      "fuelTypes": {
        "CNG": [
          "XT",
          "XZ",
          "XZ Plus",
          "XZ Plus Lux",
          "XZ+ CNG / iCNG variant",
          "XZA AMT",
          "XZA Plus AMT"
        ],
        "Petrol": [
          "Buzz",
          "JTP",
          "XE",
          "XM",
          "XT",
          "XTA AMT",
          "XZ",
          "XZ Plus",
          "XZ Plus Lux",
          "XZ+",
          "XZ+ AMT / XZA+",
          "XZA AMT",
          "XZA Plus AMT"
        ],
        "Diesel": [
          "XE",
          "XM",
          "XT",
          "XZ"
        ]
      },
      "basePrice": 570000,
      "variantPrices": {
        "CNG": {
          "XZ Plus Lux": {
            "exShowroomPrice": 900000,
            "engineCC": 1199
          },
          "XT": {
            "exShowroomPrice": 745000,
            "engineCC": 1199
          },
          "XZA Plus AMT": {
            "exShowroomPrice": 910000,
            "engineCC": 1199
          },
          "XZ Plus": {
            "exShowroomPrice": 855000,
            "engineCC": 1199
          },
          "XZ": {
            "exShowroomPrice": 800000,
            "engineCC": 1199
          },
          "XZA AMT": {
            "exShowroomPrice": 855000,
            "engineCC": 1199
          }
        },
        "Petrol": {
          "XZ Plus Lux": {
            "exShowroomPrice": 800000,
            "engineCC": 1199
          },
          "XZ": {
            "exShowroomPrice": 700000,
            "engineCC": 1199
          },
          "XZA Plus AMT": {
            "exShowroomPrice": 810000,
            "engineCC": 1199
          },
          "XTA AMT": {
            "exShowroomPrice": 700000,
            "engineCC": 1199
          },
          "XZ Plus": {
            "exShowroomPrice": 755000,
            "engineCC": 1199
          },
          "XM": {
            "exShowroomPrice": 570000,
            "engineCC": 1199
          },
          "XT": {
            "exShowroomPrice": 645000,
            "engineCC": 1199
          },
          "XZA AMT": {
            "exShowroomPrice": 755000,
            "engineCC": 1199
          },
          "XZ+": {
            "exShowroomPrice": 700000,
            "engineCC": 1199,
            "source": "existing_variant_price_alias"
          }
        },
        "Diesel": {}
      }
    },
    "Tigor EV": {
      "bodyType": "Compact Sedan (Electric)",
      "fuelTypes": {
        "Electric": [
          "XE",
          "XM",
          "XT",
          "XZ Plus",
          "XZ Plus LUX",
          "XZ+"
        ]
      },
      "basePrice": 1249000,
      "variantPrices": {
        "Electric": {
          "XZ Plus LUX": {
            "exShowroomPrice": 1375000
          },
          "XZ Plus": {
            "exShowroomPrice": 1349000
          },
          "XE": {
            "exShowroomPrice": 1249000
          },
          "XT": {
            "exShowroomPrice": 1299000
          }
        }
      }
    },
    "Xpres": {
      "bodyType": "Car",
      "fuelTypes": {
        "CNG": [
          "Xpres"
        ],
        "Petrol": [
          "Xpres"
        ]
      },
      "basePrice": 559000,
      "variantPrices": {
        "CNG": {
          "Xpres": {
            "exShowroomPrice": 649000,
            "engineCC": 1199
          }
        },
        "Petrol": {
          "Xpres": {
            "exShowroomPrice": 559000,
            "engineCC": 1199
          }
        }
      }
    },
    "Xpres T EV": {
      "bodyType": "Electric",
      "fuelTypes": {
        "Electric": [
          "XM"
        ]
      },
      "basePrice": 1304000,
      "variantPrices": {
        "Electric": {
          "XM": {
            "exShowroomPrice": 1304000
          }
        }
      }
    },
    "Yodha Pickup": {
      "bodyType": "Pickup",
      "fuelTypes": {
        "Diesel": [
          "Crew Cabin",
          "1500",
          "4x4",
          "Eco"
        ]
      },
      "basePrice": 695000,
      "variantPrices": {
        "Diesel": {
          "1500": {
            "exShowroomPrice": 710000,
            "engineCC": 2956
          },
          "Crew Cabin": {
            "exShowroomPrice": 709000,
            "engineCC": 2956
          },
          "4x4": {
            "exShowroomPrice": 750000,
            "engineCC": 2956
          },
          "Eco": {
            "exShowroomPrice": 695000,
            "engineCC": 2956
          }
        }
      }
    }
  },
  "Tesla": {
    "Model Y": {
      "bodyType": "Car",
      "fuelTypes": {
        "Electric": [
          "Premium RWD",
          "L Premium AWD"
        ]
      },
      "basePrice": 5089000,
      "variantPrices": {
        "Electric": {
          "Premium RWD": {
            "exShowroomPrice": 5089000
          },
          "L Premium AWD": {
            "exShowroomPrice": 6199000
          }
        }
      }
    }
  },
  "Toyota": {
    "Camry": {
      "bodyType": "Sedan",
      "fuelTypes": {
        "Petrol": [
          "A1",
          "A2",
          "Elegance",
          "G",
          "M4",
          "Sprint Edition",
          "V6",
          "W2",
          "W4 (base)"
        ],
        "Petrol Hybrid": [
          "Hybrid"
        ]
      },
      "basePrice": 4869000,
      "variantPrices": {
        "Petrol": {
          "Sprint Edition": {
            "exShowroomPrice": 4869000,
            "engineCC": 2487
          },
          "Elegance": {
            "exShowroomPrice": 4869000,
            "engineCC": 2487
          }
        },
        "Petrol Hybrid": {}
      }
    },
    "Fortuner": {
      "bodyType": "SUV",
      "fuelTypes": {
        "Diesel": [
          "2.7 4x2 MT (Petrol)",
          "2.8 4x2 AT",
          "2.8 4x2 MT",
          "2.8 4x4 AT",
          "2.8 4x4 MT",
          "3.0L 4x2 AT",
          "3.0L 4x2 MT",
          "3.0L 4x4 AT",
          "3.0L 4x4 MT",
          "4X2",
          "4X2 AT",
          "4x2 AT",
          "4x2 MT",
          "4X4",
          "4x4 AT",
          "4x4 MT",
          "GR S 4X4 AT",
          "Leader Edition 4x2",
          "Leader Edition 4x2 AT",
          "Neo Drive"
        ],
        "Petrol": [
          "2.7 4x2 (Petrol)",
          "4X2 AT"
        ]
      },
      "basePrice": 3476000,
      "variantPrices": {
        "Diesel": {
          "Neo Drive": {
            "exShowroomPrice": 4312000,
            "engineCC": 2755
          },
          "4X2": {
            "exShowroomPrice": 3540000,
            "engineCC": 2755
          },
          "Leader Edition 4x2": {
            "exShowroomPrice": 3479000,
            "engineCC": 2694
          },
          "Leader Edition 4x2 AT": {
            "exShowroomPrice": 3692000,
            "engineCC": 2694
          },
          "GR S 4X4 AT": {
            "exShowroomPrice": 5046000,
            "engineCC": 2755
          },
          "4X2 AT": {
            "exShowroomPrice": 3761000,
            "engineCC": 2755
          },
          "4X4": {
            "exShowroomPrice": 3935000,
            "engineCC": 2755
          },
          "4x2 AT": {
            "exShowroomPrice": 3761000,
            "engineCC": 2755,
            "source": "existing_variant_price_alias"
          }
        },
        "Petrol": {
          "4X2 AT": {
            "exShowroomPrice": 3476000,
            "engineCC": 2694
          }
        }
      }
    },
    "Fortuner Legender": {
      "bodyType": "SUV",
      "fuelTypes": {
        "Diesel": [
          "4x2 AT",
          "4x4",
          "Legender 4x2",
          "Legender 4x4",
          "Neo Drive"
        ]
      },
      "basePrice": 4292000,
      "variantPrices": {
        "Diesel": {
          "4x4": {
            "exShowroomPrice": 4508000,
            "engineCC": 2755
          },
          "4x2 AT": {
            "exShowroomPrice": 4292000,
            "engineCC": 2755
          },
          "Neo Drive": {
            "exShowroomPrice": 4829000,
            "engineCC": 2755
          }
        }
      }
    },
    "Glanza": {
      "bodyType": "Hatchback",
      "fuelTypes": {
        "Petrol": [
          "E",
          "G",
          "G AMT",
          "S",
          "S AMT",
          "V",
          "V AMT"
        ],
        "CNG": [
          "CNG variant",
          "G",
          "S"
        ]
      },
      "basePrice": 673000,
      "variantPrices": {
        "Petrol": {
          "V AMT": {
            "exShowroomPrice": 999000,
            "engineCC": 1197
          },
          "V": {
            "exShowroomPrice": 948000,
            "engineCC": 1197
          },
          "G": {
            "exShowroomPrice": 865000,
            "engineCC": 1197
          },
          "S": {
            "exShowroomPrice": 763000,
            "engineCC": 1197
          },
          "G AMT": {
            "exShowroomPrice": 925000,
            "engineCC": 1197
          },
          "E": {
            "exShowroomPrice": 673000,
            "engineCC": 1197
          },
          "S AMT": {
            "exShowroomPrice": 828000,
            "engineCC": 1197
          }
        },
        "CNG": {
          "S": {
            "exShowroomPrice": 849000,
            "engineCC": 1197
          },
          "G": {
            "exShowroomPrice": 953000,
            "engineCC": 1197
          }
        }
      }
    },
    "Hilux": {
      "bodyType": "Pickup (lifestyle/crew-cab)",
      "fuelTypes": {
        "Diesel": [
          "GX 4x2 AT",
          "GX 4x4 AT",
          "High 4x4 AT",
          "High 4x4 MT",
          "Legender / GR-Sport-styled top trim",
          "Standard 4x4 MT",
          "VX 4x4 AT"
        ]
      },
      "basePrice": 3199000,
      "variantPrices": {
        "Diesel": {
          "GX 4x4 AT": {
            "exShowroomPrice": 3369000,
            "engineCC": 2755
          },
          "VX 4x4 AT": {
            "exShowroomPrice": 3669000,
            "engineCC": 2755
          },
          "GX 4x2 AT": {
            "exShowroomPrice": 3199000,
            "engineCC": 2755
          }
        }
      }
    },
    "Innova Crysta": {
      "bodyType": "MPV",
      "fuelTypes": {
        "Diesel": [
          "GX",
          "GX 7-Seater",
          "GX 7-Seater Platinum White Pearl",
          "GX 8-Seater",
          "GX 8-Seater Platinum White Pearl",
          "GX Plus 7-Seater",
          "GX Plus 7-Seater Platinum White Pearl",
          "GX Plus 8-Seater",
          "GX Plus 8-Seater Platinum White Pearl",
          "Leadership Edition",
          "VX",
          "VX 7-Seater",
          "VX 7-Seater Platinum White Pearl",
          "VX 8-Seater",
          "VX 8-Seater Platinum White Pearl",
          "ZX",
          "ZX 7-Seater",
          "ZX 7-Seater Platinum White Pearl",
          "ZX(O)"
        ],
        "Petrol": [
          "GX",
          "VX",
          "ZX"
        ]
      },
      "basePrice": 1972000,
      "variantPrices": {
        "Diesel": {
          "GX Plus 7-Seater": {
            "exShowroomPrice": 2115000,
            "engineCC": 2393
          },
          "GX 7-Seater Platinum White Pearl": {
            "exShowroomPrice": 1986000,
            "engineCC": 2393
          },
          "ZX 7-Seater Platinum White Pearl": {
            "exShowroomPrice": 2677000,
            "engineCC": 2393
          },
          "VX 7-Seater Platinum White Pearl": {
            "exShowroomPrice": 2507000,
            "engineCC": 2393
          },
          "VX 7-Seater": {
            "exShowroomPrice": 2493000,
            "engineCC": 2393
          },
          "VX 8-Seater": {
            "exShowroomPrice": 2498000,
            "engineCC": 2393
          },
          "VX 8-Seater Platinum White Pearl": {
            "exShowroomPrice": 2512000,
            "engineCC": 2393
          },
          "GX 8-Seater": {
            "exShowroomPrice": 1977000,
            "engineCC": 2393
          },
          "GX 7-Seater": {
            "exShowroomPrice": 1972000,
            "engineCC": 2393
          },
          "GX Plus 8-Seater Platinum White Pearl": {
            "exShowroomPrice": 2134000,
            "engineCC": 2393
          },
          "ZX 7-Seater": {
            "exShowroomPrice": 2663000,
            "engineCC": 2393
          },
          "GX Plus 8-Seater": {
            "exShowroomPrice": 2120000,
            "engineCC": 2393
          },
          "GX Plus 7-Seater Platinum White Pearl": {
            "exShowroomPrice": 2129000,
            "engineCC": 2393
          },
          "GX 8-Seater Platinum White Pearl": {
            "exShowroomPrice": 1991000,
            "engineCC": 2393
          }
        },
        "Petrol": {}
      }
    },
    "Innova Hycross": {
      "bodyType": "MPV (Hybrid/ICE)",
      "fuelTypes": {
        "Petrol": [
          "7-seat vs 8-seat configuration",
          "G Fleet 7STR",
          "G Fleet 8STR",
          "GX",
          "GX (O) 7STR",
          "GX (O) 8STR",
          "GX 7STR",
          "GX 8STR",
          "VX",
          "VX 7STR Hybrid",
          "VX 8STR Hybrid",
          "VX(O) 7STR Hybrid",
          "VX(O) 8STR Hybrid",
          "ZX",
          "ZX Hybrid",
          "ZX(O)",
          "ZX(O) Hybrid"
        ],
        "Petrol Hybrid": [
          "7-seat vs 8-seat configuration",
          "E",
          "G",
          "GX",
          "VX",
          "ZX",
          "ZX(O)"
        ]
      },
      "basePrice": 1870000,
      "variantPrices": {
        "Petrol": {
          "VX(O) 7STR Hybrid": {
            "exShowroomPrice": 2877000,
            "engineCC": 1987
          },
          "ZX Hybrid": {
            "exShowroomPrice": 3120000,
            "engineCC": 1987
          },
          "G Fleet 8STR": {
            "exShowroomPrice": 1875000,
            "engineCC": 1987
          },
          "VX(O) 8STR Hybrid": {
            "exShowroomPrice": 2882000,
            "engineCC": 1987
          },
          "GX (O) 7STR": {
            "exShowroomPrice": 2097000,
            "engineCC": 1987
          },
          "VX 8STR Hybrid": {
            "exShowroomPrice": 2681000,
            "engineCC": 1987
          },
          "VX 7STR Hybrid": {
            "exShowroomPrice": 2676000,
            "engineCC": 1987
          },
          "ZX(O) Hybrid": {
            "exShowroomPrice": 3184000,
            "engineCC": 1987
          },
          "GX (O) 8STR": {
            "exShowroomPrice": 2084000,
            "engineCC": 1987
          },
          "GX 7STR": {
            "exShowroomPrice": 1953000,
            "engineCC": 1987
          },
          "G Fleet 7STR": {
            "exShowroomPrice": 1870000,
            "engineCC": 1987
          },
          "GX 8STR": {
            "exShowroomPrice": 1958000,
            "engineCC": 1987
          }
        },
        "Petrol Hybrid": {}
      }
    },
    "Land Cruiser 300": {
      "bodyType": "Full-size SUV",
      "fuelTypes": {
        "Diesel": [
          "GR Sport / GR-S",
          "GR-S",
          "VX",
          "ZX"
        ]
      },
      "basePrice": 21800000,
      "variantPrices": {
        "Diesel": {
          "GR-S": {
            "exShowroomPrice": 2,
            "engineCC": 3346
          },
          "ZX": {
            "exShowroomPrice": 2,
            "engineCC": 3346
          }
        }
      }
    },
    "Rumion": {
      "bodyType": "MPV",
      "fuelTypes": {
        "Petrol": [
          "E",
          "G",
          "G AT",
          "S",
          "S AT",
          "V",
          "V AT"
        ],
        "CNG": [
          "CNG variant",
          "S"
        ],
        "Petrol Mild-Hybrid": [
          "G",
          "S",
          "V"
        ]
      },
      "basePrice": 979000,
      "variantPrices": {
        "Petrol": {
          "S AT": {
            "exShowroomPrice": 1235000,
            "engineCC": 1462
          },
          "V AT": {
            "exShowroomPrice": 1421000,
            "engineCC": 1462
          },
          "S": {
            "exShowroomPrice": 1077000,
            "engineCC": 1462
          },
          "V": {
            "exShowroomPrice": 1270000,
            "engineCC": 1462
          },
          "G": {
            "exShowroomPrice": 1193000,
            "engineCC": 1462
          },
          "E": {
            "exShowroomPrice": 979000,
            "engineCC": 1462
          },
          "G AT": {
            "exShowroomPrice": 1344000,
            "engineCC": 1462
          }
        },
        "CNG": {
          "S": {
            "exShowroomPrice": 1169000,
            "engineCC": 1462
          }
        },
        "Petrol Mild-Hybrid": {}
      }
    },
    "Taisor": {
      "bodyType": "SUV",
      "fuelTypes": {
        "Petrol": [
          "E",
          "G",
          "G Turbo",
          "G Turbo AT",
          "S",
          "S AMT",
          "S Plus",
          "S Plus AMT",
          "V",
          "V Turbo",
          "V Turbo AT",
          "V Turbo AT Dual Tone",
          "V Turbo Dual Tone"
        ],
        "CNG": [
          "CNG variant",
          "E"
        ]
      },
      "basePrice": 743000,
      "variantPrices": {
        "Petrol": {
          "S AMT": {
            "exShowroomPrice": 894000,
            "engineCC": 1197
          },
          "G Turbo": {
            "exShowroomPrice": 1045000,
            "engineCC": 998
          },
          "E": {
            "exShowroomPrice": 743000,
            "engineCC": 1197
          },
          "V Turbo AT Dual Tone": {
            "exShowroomPrice": 1294000,
            "engineCC": 998
          },
          "S": {
            "exShowroomPrice": 833000,
            "engineCC": 1197
          },
          "V Turbo": {
            "exShowroomPrice": 1136000,
            "engineCC": 998
          },
          "V Turbo Dual Tone": {
            "exShowroomPrice": 1152000,
            "engineCC": 998
          },
          "S Plus AMT": {
            "exShowroomPrice": 929000,
            "engineCC": 1197
          },
          "G Turbo AT": {
            "exShowroomPrice": 1186000,
            "engineCC": 998
          },
          "S Plus": {
            "exShowroomPrice": 868000,
            "engineCC": 1197
          },
          "V Turbo AT": {
            "exShowroomPrice": 1278000,
            "engineCC": 998
          }
        },
        "CNG": {
          "E": {
            "exShowroomPrice": 845000,
            "engineCC": 1197
          }
        }
      }
    },
    "Urban Cruiser EBELLA": {
      "bodyType": "Car",
      "fuelTypes": {
        "Electric": [
          "E3"
        ]
      },
      "basePrice": 2360000,
      "variantPrices": {
        "Electric": {
          "E3": {
            "exShowroomPrice": 2360000
          }
        }
      }
    },
    "Urban Cruiser Hyryder": {
      "bodyType": "Compact SUV (Hybrid/ICE)",
      "fuelTypes": {
        "Petrol": [
          "G Opt Aero Black Edition HYBRID",
          "Hyryder E",
          "Hyryder G Opt",
          "Hyryder G Opt Aero Black Edition",
          "Hyryder G Opt Aero Black Edition AT",
          "Hyryder G Opt AT",
          "Hyryder G Opt HYBRID",
          "Hyryder G Opt HYBRID Dual Tone",
          "Hyryder S",
          "Hyryder S AT",
          "Hyryder S HYBRID",
          "Hyryder V",
          "Hyryder V Aero Black Edition",
          "Hyryder V Aero Black Edition AT",
          "Hyryder V Aero Black Edition AWD AT",
          "Hyryder V Aero Black Edition HYBRID",
          "Hyryder V AT",
          "Hyryder V AWD AT",
          "Hyryder V AWD Dual Tone AT",
          "Hyryder V Dual Tone",
          "Hyryder V Dual Tone AT",
          "Hyryder V HYBRID",
          "Hyryder V HYBRID Dual Tone",
          "Toyota Hyryder E",
          "Toyota Hyryder G Opt",
          "Toyota Hyryder G Opt Aero Black Edition",
          "Toyota Hyryder G Opt Aero Black Edition AT",
          "Toyota Hyryder G Opt AT",
          "Toyota Hyryder G Opt HYBRID",
          "Toyota Hyryder G Opt HYBRID Dual Tone",
          "Toyota Hyryder S",
          "Toyota Hyryder S AT",
          "Toyota Hyryder S HYBRID",
          "Toyota Hyryder V",
          "Toyota Hyryder V Aero Black Edition",
          "Toyota Hyryder V Aero Black Edition AT",
          "Toyota Hyryder V Aero Black Edition AWD AT",
          "Toyota Hyryder V Aero Black Edition HYBRID",
          "Toyota Hyryder V AT",
          "Toyota Hyryder V AWD AT",
          "Toyota Hyryder V AWD Dual Tone AT",
          "Toyota Hyryder V Dual Tone",
          "Toyota Hyryder V Dual Tone AT",
          "Toyota Hyryder V HYBRID",
          "Toyota Hyryder V HYBRID Dual Tone"
        ],
        "CNG": [
          "CNG variant",
          "Hyryder G",
          "Hyryder S",
          "Toyota Hyryder G",
          "Toyota Hyryder S"
        ],
        "Petrol Hybrid": [
          "G",
          "S",
          "V"
        ],
        "Petrol Mild-Hybrid": [
          "AWD variant (mild-hybrid)",
          "E",
          "G",
          "S",
          "V"
        ]
      },
      "basePrice": 1131000,
      "variantPrices": {
        "Petrol": {
          "Hyryder G Opt": {
            "exShowroomPrice": 1487000,
            "engineCC": 1462
          },
          "Hyryder E": {
            "exShowroomPrice": 1131000,
            "engineCC": 1462
          },
          "Hyryder G Opt Aero Black Edition AT": {
            "exShowroomPrice": 1650000,
            "engineCC": 1462
          },
          "Hyryder V AWD AT": {
            "exShowroomPrice": 1872000,
            "engineCC": 1462
          },
          "Hyryder S AT": {
            "exShowroomPrice": 1417000,
            "engineCC": 1462
          },
          "Hyryder V AWD Dual Tone AT": {
            "exShowroomPrice": 1892000,
            "engineCC": 1462
          },
          "Hyryder V Dual Tone AT": {
            "exShowroomPrice": 1787000,
            "engineCC": 1462
          },
          "Hyryder G Opt AT": {
            "exShowroomPrice": 1618000,
            "engineCC": 1462
          },
          "G Opt Aero Black Edition HYBRID": {
            "exShowroomPrice": 1956000,
            "engineCC": 1490
          },
          "Hyryder G Opt HYBRID Dual Tone": {
            "exShowroomPrice": 1944000,
            "engineCC": 1490
          },
          "Hyryder G Opt HYBRID": {
            "exShowroomPrice": 1944000,
            "engineCC": 1490
          },
          "Hyryder S HYBRID": {
            "exShowroomPrice": 1718000,
            "engineCC": 1490
          },
          "Hyryder V Aero Black Edition": {
            "exShowroomPrice": 1674000,
            "engineCC": 1462
          },
          "Hyryder V Aero Black Edition AWD AT": {
            "exShowroomPrice": 1904000,
            "engineCC": 1462
          },
          "Hyryder V HYBRID": {
            "exShowroomPrice": 1999000,
            "engineCC": 1490
          },
          "Hyryder V AT": {
            "exShowroomPrice": 1767000,
            "engineCC": 1462
          },
          "Hyryder V Aero Black Edition AT": {
            "exShowroomPrice": 1799000,
            "engineCC": 1462
          },
          "Hyryder V Aero Black Edition HYBRID": {
            "exShowroomPrice": 2031000,
            "engineCC": 1490
          },
          "Hyryder V": {
            "exShowroomPrice": 1872000,
            "engineCC": 1462
          },
          "Hyryder S": {
            "exShowroomPrice": 1417000,
            "engineCC": 1462
          },
          "Hyryder V HYBRID Dual Tone": {
            "exShowroomPrice": 2019000,
            "engineCC": 1490
          },
          "Hyryder G Opt Aero Black Edition": {
            "exShowroomPrice": 1650000,
            "engineCC": 1462
          },
          "Hyryder V Dual Tone": {
            "exShowroomPrice": 1787000,
            "engineCC": 1462
          }
        },
        "CNG": {
          "Hyryder S": {
            "exShowroomPrice": 1371000,
            "engineCC": 1462
          },
          "Hyryder G": {
            "exShowroomPrice": 1572000,
            "engineCC": 1462
          }
        },
        "Petrol Hybrid": {},
        "Petrol Mild-Hybrid": {}
      }
    },
    "Vellfire": {
      "bodyType": "Luxury MPV",
      "fuelTypes": {
        "Petrol": [
          "Hi",
          "VIP Executive Lounge"
        ],
        "Petrol Hybrid": [
          "Executive Lounge (single/top trim)"
        ]
      },
      "basePrice": 12000000,
      "variantPrices": {
        "Petrol": {
          "Hi": {
            "exShowroomPrice": 1,
            "engineCC": 2487
          },
          "VIP Executive Lounge": {
            "exShowroomPrice": 1,
            "engineCC": 2487
          }
        },
        "Petrol Hybrid": {}
      }
    }
  },
  "Vayve-Mobility": {
    "Eva": {
      "bodyType": "Electric",
      "fuelTypes": {
        "Electric": [
          "Vega",
          "Stella",
          "Nova"
        ]
      },
      "basePrice": 399000,
      "variantPrices": {
        "Electric": {
          "Vega": {
            "exShowroomPrice": 599000
          },
          "Stella": {
            "exShowroomPrice": 499000
          },
          "Nova": {
            "exShowroomPrice": 399000
          }
        }
      }
    }
  },
  "Vinfast": {
    "Limo Green": {
      "bodyType": "Car",
      "fuelTypes": {
        "Electric": [
          "Limo Green"
        ]
      },
      "basePrice": 2299000,
      "variantPrices": {
        "Electric": {
          "Limo Green": {
            "exShowroomPrice": 2299000
          }
        }
      }
    },
    "VF MPV 7": {
      "bodyType": "MPV",
      "fuelTypes": {
        "Electric": [
          "VF MPV 7"
        ]
      },
      "basePrice": 2449000,
      "variantPrices": {
        "Electric": {
          "VF MPV 7": {
            "exShowroomPrice": 2449000
          }
        }
      }
    },
    "VF6": {
      "bodyType": "Car",
      "fuelTypes": {
        "Electric": [
          "Wind",
          "Earth",
          "Wind Infinity"
        ]
      },
      "basePrice": 1819000,
      "variantPrices": {
        "Electric": {
          "Wind": {
            "exShowroomPrice": 1959000
          },
          "Earth": {
            "exShowroomPrice": 1819000
          },
          "Wind Infinity": {
            "exShowroomPrice": 2009000
          }
        }
      }
    },
    "VF7": {
      "bodyType": "Car",
      "fuelTypes": {
        "Electric": [
          "Sky",
          "Wind",
          "Sky Infinity",
          "Wind Infinity",
          "Earth"
        ]
      },
      "basePrice": 2299000,
      "variantPrices": {
        "Electric": {
          "Sky": {
            "exShowroomPrice": 2749000
          },
          "Wind": {
            "exShowroomPrice": 2589000
          },
          "Sky Infinity": {
            "exShowroomPrice": 2809000
          },
          "Wind Infinity": {
            "exShowroomPrice": 2639000
          },
          "Earth": {
            "exShowroomPrice": 2299000
          }
        }
      }
    }
  },
  "Volkswagen": {
    "Golf GTI": {
      "bodyType": "Hatchback",
      "fuelTypes": {
        "Petrol": [
          "2.0 TSI",
          "GTI (single/top trim)"
        ]
      },
      "basePrice": 5091000,
      "variantPrices": {
        "Petrol": {
          "2.0 TSI": {
            "exShowroomPrice": 5091000,
            "engineCC": 1984
          }
        }
      }
    },
    "Taigun": {
      "bodyType": "SUV",
      "fuelTypes": {
        "Petrol": [
          "Comfortline",
          "GT Line",
          "GT Line AT",
          "GT Plus Chrome",
          "GT Plus Chrome DSG",
          "GT Plus Sport",
          "GT Plus Sport DSG",
          "Highline",
          "Highline AT",
          "Highline Plus",
          "Highline Plus AT",
          "Topline",
          "Topline AT"
        ]
      },
      "basePrice": 1100000,
      "variantPrices": {
        "Petrol": {
          "Highline AT": {
            "exShowroomPrice": 1380000,
            "engineCC": 999
          },
          "Highline Plus": {
            "exShowroomPrice": 1430000,
            "engineCC": 999
          },
          "GT Line AT": {
            "exShowroomPrice": 1575000,
            "engineCC": 999
          },
          "Topline AT": {
            "exShowroomPrice": 1718000,
            "engineCC": 999
          },
          "Comfortline": {
            "exShowroomPrice": 1100000,
            "engineCC": 999
          },
          "Highline": {
            "exShowroomPrice": 1270000,
            "engineCC": 999
          },
          "Topline": {
            "exShowroomPrice": 1600000,
            "engineCC": 999
          },
          "GT Plus Chrome DSG": {
            "exShowroomPrice": 1900000,
            "engineCC": 1498
          },
          "Highline Plus AT": {
            "exShowroomPrice": 1545000,
            "engineCC": 999
          },
          "GT Line": {
            "exShowroomPrice": 1460000,
            "engineCC": 999
          },
          "GT Plus Sport DSG": {
            "exShowroomPrice": 1930000,
            "engineCC": 1498
          }
        }
      }
    },
    "Tayron": {
      "bodyType": "SUV",
      "fuelTypes": {
        "Petrol": [
          "Life",
          "R-Line"
        ]
      },
      "basePrice": 4199000,
      "variantPrices": {
        "Petrol": {
          "Life": {
            "exShowroomPrice": 4199000,
            "engineCC": 1984
          },
          "R-Line": {
            "exShowroomPrice": 4774000,
            "engineCC": 1984
          }
        }
      }
    },
    "Tiguan R-Line": {
      "bodyType": "Car",
      "fuelTypes": {
        "Petrol": [
          "2.0L TSI"
        ]
      },
      "basePrice": 4711000,
      "variantPrices": {
        "Petrol": {
          "2.0L TSI": {
            "exShowroomPrice": 4711000,
            "engineCC": 1984
          }
        }
      }
    },
    "Virtus": {
      "bodyType": "Sedan",
      "fuelTypes": {
        "Petrol": [
          "Anniversary Edition",
          "Comfortline",
          "GT Line",
          "GT Line AT",
          "GT Plus",
          "GT Plus DSG ES",
          "GT Plus Sport",
          "GT Plus Sport DSG",
          "Highline",
          "Highline AT",
          "Highline Plus",
          "Highline Plus AT",
          "Topline",
          "Topline AT ES",
          "Topline ES"
        ]
      },
      "basePrice": 1050000,
      "variantPrices": {
        "Petrol": {
          "Highline": {
            "exShowroomPrice": 1346000,
            "engineCC": 999
          },
          "GT Line AT": {
            "exShowroomPrice": 1500000,
            "engineCC": 999
          },
          "Highline Plus AT": {
            "exShowroomPrice": 1491000,
            "engineCC": 999
          },
          "Highline Plus": {
            "exShowroomPrice": 1386000,
            "engineCC": 999
          },
          "GT Plus Sport DSG": {
            "exShowroomPrice": 1900000,
            "engineCC": 1498
          },
          "GT Line": {
            "exShowroomPrice": 1410000,
            "engineCC": 999
          },
          "Comfortline": {
            "exShowroomPrice": 1050000,
            "engineCC": 999
          },
          "GT Plus DSG ES": {
            "exShowroomPrice": 1880000,
            "engineCC": 1498
          },
          "Highline AT": {
            "exShowroomPrice": 1466000,
            "engineCC": 999
          },
          "Topline ES": {
            "exShowroomPrice": 1511000,
            "engineCC": 999
          },
          "Topline AT ES": {
            "exShowroomPrice": 1630000,
            "engineCC": 999
          },
          "Anniversary Edition": {
            "exShowroomPrice": 1920000,
            "engineCC": 1498
          }
        }
      }
    }
  },
  "Volvo": {
    "EC40": {
      "bodyType": "Car",
      "fuelTypes": {
        "Electric": [
          "E80"
        ]
      },
      "basePrice": 5900000,
      "variantPrices": {
        "Electric": {
          "E80": {
            "exShowroomPrice": 5900000
          }
        }
      }
    },
    "EX30": {
      "bodyType": "SUV",
      "fuelTypes": {
        "Electric": [
          "RWD Ultra"
        ]
      },
      "basePrice": 4100000,
      "variantPrices": {
        "Electric": {
          "RWD Ultra": {
            "exShowroomPrice": 4100000
          }
        }
      }
    },
    "EX40": {
      "bodyType": "SUV",
      "fuelTypes": {
        "Electric": [
          "E60 Plus"
        ]
      },
      "basePrice": 4900000,
      "variantPrices": {
        "Electric": {
          "E60 Plus": {
            "exShowroomPrice": 4900000
          }
        }
      }
    },
    "XC60": {
      "bodyType": "Car",
      "fuelTypes": {
        "Petrol": [
          "B5"
        ]
      },
      "basePrice": 6890000,
      "variantPrices": {
        "Petrol": {
          "B5": {
            "exShowroomPrice": 6890000,
            "engineCC": 1969
          }
        }
      }
    },
    "XC90": {
      "bodyType": "Car",
      "fuelTypes": {
        "Petrol": [
          "B5 AWD"
        ]
      },
      "basePrice": 9780000,
      "variantPrices": {
        "Petrol": {
          "B5 AWD": {
            "exShowroomPrice": 9780000,
            "engineCC": 1969
          }
        }
      }
    }
  }
};
