export interface FertilizerStage {
  stageNameHi: string;
  stageNameEn: string;
  timelineHi: string;
  timelineEn: string;
  descriptionHi: string;
  descriptionEn: string;
  recommendations: {
    fertilizerNameHi: string;
    fertilizerNameEn: string;
    quantityPerAcre: string;
    notesHi: string;
    notesEn: string;
  }[];
}

export interface CropFertilizerProfile {
  cropId: string;
  cropNameHi: string;
  cropNameEn: string;
  baseDapPerAcre: number;   // 50kg bags
  baseUreaPerAcre: number;  // 45kg bags
  baseMopPerAcre: number;   // 50kg bags
  zincRecommendationHi: string;
  zincRecommendationEn: string;
  sulphurRecommendationHi: string;
  sulphurRecommendationEn: string;
  micronutrientAlertHi: string;
  micronutrientAlertEn: string;
  stages: FertilizerStage[];
}

export const FERTILIZER_PRICES = {
  urea: { nameHi: 'नीम कोटेड यूरिया (45 kg)', nameEn: 'Neem Coated Urea (45 kg)', pricePerBag: 266 },
  dap: { nameHi: 'डीएपी DAP 18:46:0 (50 kg)', nameEn: 'DAP 18:46:0 (50 kg)', pricePerBag: 1350 },
  mop: { nameHi: 'एमओपी MOP पोटाश (50 kg)', nameEn: 'MOP Potash (50 kg)', pricePerBag: 1700 }
};

export const CROP_FERTILIZER_DATA: Record<string, CropFertilizerProfile> = {
  crop_wheat: {
    cropId: 'crop_wheat',
    cropNameHi: 'गेहूं (Wheat)',
    cropNameEn: 'Wheat',
    baseDapPerAcre: 1,
    baseUreaPerAcre: 2,
    baseMopPerAcre: 0.5,
    zincRecommendationHi: '5 किग्रा जिंक सल्फेट (21%) प्रति एकड़ पहले पानी पर दें।',
    zincRecommendationEn: '5 kg Zinc Sulphate (21%) per acre at 1st irrigation.',
    sulphurRecommendationHi: 'सल्फर 90% (दानेदार) 3 किग्रा बुवाई के समय दाने की चमक व प्रोटीन बढ़ाता है।',
    sulphurRecommendationEn: 'Sulphur 90% (3 kg) at sowing enhances grain shine and protein.',
    micronutrientAlertHi: 'गेहूं में CRI अवस्था (21 दिन) पर जिंक व यूरिया की कमी से कल्ले कम निकलते हैं।',
    micronutrientAlertEn: 'Zinc & Nitrogen deficiency during CRI stage (21 days) severely reduces tillering.',
    stages: [
      {
        stageNameHi: 'बुवाई के समय (बेसल खुराक)',
        stageNameEn: 'Basal Dosage (At Sowing)',
        timelineHi: 'दिन 0 (बुवाई पूर्व/साथ)',
        timelineEn: 'Day 0 (Pre-sowing / with seed drill)',
        descriptionHi: '1 बोरी DAP (50kg) + 0.5 बोरी पोटाश (25kg) प्रति एकड़ हल के पीछे या सीड-ड्रिल से बीज के 5 सेमी नीचे दें।',
        descriptionEn: '1 Bag DAP (50kg) + 0.5 Bag MOP Potash (25kg) per acre placed 5cm below seed.',
        recommendations: [
          { fertilizerNameHi: 'DAP (18:46:0)', fertilizerNameEn: 'DAP (18:46:0)', quantityPerAcre: '50 kg (1 बोरी)', notesHi: 'जड़ों के गहरे विकास हेतु', notesEn: 'Root establishment' },
          { fertilizerNameHi: 'MOP पोटाश', fertilizerNameEn: 'MOP Potash', quantityPerAcre: '25 kg (0.5 बोरी)', notesHi: 'तने की मजबूती व रोग प्रतिरोध', notesEn: 'Stem strength & frost resistance' }
        ]
      },
      {
        stageNameHi: 'प्रथम सिंचाई / CRI स्टेज (टॉप ड्रेसिंग 1)',
        stageNameEn: '1st Irrigation (CRI Stage - Top Dressing 1)',
        timelineHi: '21 से 25 दिन पर',
        timelineEn: '21 to 25 Days After Sowing',
        descriptionHi: '1 बोरी यूरिया (45kg) + 5 किग्रा जिंक सल्फेट प्रति एकड़ पहले पानी के तुरंत बाद खेत में बतर आने पर छिड़कें।',
        descriptionEn: '1 Bag Urea (45kg) + 5kg Zinc Sulphate per acre right after first irrigation.',
        recommendations: [
          { fertilizerNameHi: 'नीम कोटेड यूरिया', fertilizerNameEn: 'Neem Coated Urea', quantityPerAcre: '45 kg (1 बोरी)', notesHi: 'कल्ले फूटने की गति तेज करता है', notesEn: 'Fast vegetative tillering' },
          { fertilizerNameHi: 'जिंक सल्फेट (21%)', fertilizerNameEn: 'Zinc Sulphate (21%)', quantityPerAcre: '5 kg', notesHi: 'पत्ती का पीलापन दूर करता है', notesEn: 'Prevents Khaira/leaf chlorosis' }
        ]
      },
      {
        stageNameHi: 'द्वितीय सिंचाई (टॉप ड्रेसिंग 2)',
        stageNameEn: '2nd Irrigation (Top Dressing 2)',
        timelineHi: '40 से 45 दिन पर',
        timelineEn: '40 to 45 Days After Sowing',
        descriptionHi: '1 बोरी यूरिया (45kg) प्रति एकड़। यदि बालियां निकलने का समय हो तो 00:52:34 का 1 किग्रा फोलियर स्प्रे भी दिया जा सकता है।',
        descriptionEn: '1 Bag Urea (45kg) per acre during jointing/tillering phase.',
        recommendations: [
          { fertilizerNameHi: 'नीम कोटेड यूरिया', fertilizerNameEn: 'Neem Coated Urea', quantityPerAcre: '45 kg (1 बोरी)', notesHi: 'बालियों की लंबाई व दानों का भराव', notesEn: 'Spikelet & grain formation' }
        ]
      }
    ]
  },

  crop_mustard: {
    cropId: 'crop_mustard',
    cropNameHi: 'सरसों (Mustard)',
    cropNameEn: 'Mustard',
    baseDapPerAcre: 1,
    baseUreaPerAcre: 1,
    baseMopPerAcre: 0,
    zincRecommendationHi: 'जिंक की हल्की मात्रा (2-3 किग्रा) रेतीली मिट्टी में लाभदायक है।',
    zincRecommendationEn: '2-3 kg Zinc Sulphate is beneficial in light sandy soils.',
    sulphurRecommendationHi: '★ अति महत्वपूर्ण: 10 किग्रा बेंटोनाइट सल्फर (90%) बुवाई पर अवश्य दें, इससे तेल 3% तक बढ़ता है।',
    sulphurRecommendationEn: '★ Critical: Apply 10 kg Bentonite Sulphur (90%) at sowing to boost oil yield by up to 3%.',
    micronutrientAlertHi: 'तिलहन फसलों के लिए सल्फर प्राणवायु के समान है — बिना सल्फर के दाने में तेल की मात्रा घट जाती है।',
    micronutrientAlertEn: 'Sulphur is vital for oil synthesis; deficiency leads to empty pods and low oil content.',
    stages: [
      {
        stageNameHi: 'बुवाई के समय (बेसल खुराक)',
        stageNameEn: 'Basal Dosage (At Sowing)',
        timelineHi: 'दिन 0',
        timelineEn: 'Day 0',
        descriptionHi: '1 बोरी DAP (50kg) + 10 किग्रा सल्फर 90% बेंटोनाइट प्रति एकड़ बुवाई पूर्व मिट्टी में मिलाएं।',
        descriptionEn: '1 Bag DAP (50kg) + 10kg Bentonite Sulphur per acre incorporated into seedbed.',
        recommendations: [
          { fertilizerNameHi: 'DAP (18:46:0)', fertilizerNameEn: 'DAP (18:46:0)', quantityPerAcre: '50 kg (1 बोरी)', notesHi: 'फास्फोरस व प्राथमिक नाइट्रोजन', notesEn: 'Phosphorus starter' },
          { fertilizerNameHi: 'बेंटोनाइट सल्फर (90%)', fertilizerNameEn: 'Bentonite Sulphur (90%)', quantityPerAcre: '10 kg', notesHi: 'तेल की मात्रा व दाने का वजन बढ़ाने हेतु', notesEn: 'Oil content & weight booster' }
        ]
      },
      {
        stageNameHi: 'प्रथम सिंचाई (फूल आने से पूर्व)',
        stageNameEn: '1st Irrigation (Pre-flowering)',
        timelineHi: '25 से 30 दिन पर',
        timelineEn: '25 to 30 Days After Sowing',
        descriptionHi: '1 बोरी यूरिया (45kg) सिंचाई के बाद खेत में नमी होने पर दें। फूल खिलने के बाद यूरिया न डालें।',
        descriptionEn: '1 Bag Urea (45kg) per acre after 1st irrigation. Avoid nitrogen once 50% blooms appear.',
        recommendations: [
          { fertilizerNameHi: 'नीम कोटेड यूरिया', fertilizerNameEn: 'Neem Coated Urea', quantityPerAcre: '45 kg (1 बोरी)', notesHi: 'शाखाओं का विस्तार व बहार', notesEn: 'Branching and foliage vigor' }
        ]
      }
    ]
  },

  crop_paddy: {
    cropId: 'crop_paddy',
    cropNameHi: 'धान (Paddy / Rice)',
    cropNameEn: 'Paddy / Rice',
    baseDapPerAcre: 1,
    baseUreaPerAcre: 2,
    baseMopPerAcre: 0.5,
    zincRecommendationHi: '10 किग्रा जिंक सल्फेट (21%) बुवाई या रोपाई के समय लेव (कद्दू) करते समय दें — खैरा रोग से बचाव।',
    zincRecommendationEn: '10 kg Zinc Sulphate at puddling/transplanting to prevent Khaira disease.',
    sulphurRecommendationHi: 'धान में 5 किग्रा सल्फर दानेदार देने से नाइट्रोजन दक्षता बढ़ती है।',
    sulphurRecommendationEn: '5 kg Sulphur improves nitrogen utilization in standing flood water.',
    micronutrientAlertHi: 'धान में जिंक की कमी से पत्तियों पर कत्थई धब्बे (खैरा रोग) बनते हैं जिससे 30% तक उपज गिर सकती है।',
    micronutrientAlertEn: 'Zinc deficiency causes rusty brown spots (Khaira disease), reducing paddy yields up to 30%.',
    stages: [
      {
        stageNameHi: 'रोपाई / बुवाई (लेव करते समय)',
        stageNameEn: 'Basal Dosage (Puddling / Transplanting)',
        timelineHi: 'दिन 0 (रोपाई के समय)',
        timelineEn: 'Day 0 (Transplanting)',
        descriptionHi: '1 बोरी DAP (50kg) + 0.5 बोरी पोटाश (25kg) + 10 किग्रा जिंक सल्फेट अंतिम जुताई पर दें।',
        descriptionEn: '1 Bag DAP (50kg) + 0.5 Bag MOP (25kg) + 10kg Zinc Sulphate incorporated at puddling.',
        recommendations: [
          { fertilizerNameHi: 'DAP (18:46:0)', fertilizerNameEn: 'DAP (18:46:0)', quantityPerAcre: '50 kg (1 बोरी)', notesHi: 'जड़ विकास', notesEn: 'Root growth' },
          { fertilizerNameHi: 'MOP पोटाश', fertilizerNameEn: 'MOP Potash', quantityPerAcre: '25 kg (0.5 बोरी)', notesHi: 'रोग प्रतिरोध व बालियों में दाना भरना', notesEn: 'Disease resistance' },
          { fertilizerNameHi: 'जिंक सल्फेट (21%)', fertilizerNameEn: 'Zinc Sulphate', quantityPerAcre: '10 kg', notesHi: 'खैरा रोग सुरक्षा कवच', notesEn: 'Khaira defense' }
        ]
      },
      {
        stageNameHi: 'कल्ले फूटते समय (टिल्लरिंग)',
        stageNameEn: 'Tillering Stage (Top Dressing 1)',
        timelineHi: '20 से 25 दिन रोपाई बाद',
        timelineEn: '20-25 Days After Transplanting',
        descriptionHi: '1 बोरी यूरिया (45kg) प्रति एकड़ खेत में पानी का स्तर 2-3 सेमी रखते हुए डालें।',
        descriptionEn: '1 Bag Urea (45kg) per acre with thin water layer in field.',
        recommendations: [
          { fertilizerNameHi: 'नीम कोटेड यूरिया', fertilizerNameEn: 'Neem Coated Urea', quantityPerAcre: '45 kg (1 बोरी)', notesHi: 'प्रति पौधा 20-25 कल्ले बनाना', notesEn: 'Promotes vigorous tillers' }
        ]
      },
      {
        stageNameHi: 'गभोभ अवस्था / बाली निकलने से पूर्व',
        stageNameEn: 'Panicle Initiation (Top Dressing 2)',
        timelineHi: '45 से 50 दिन रोपाई बाद',
        timelineEn: '45-50 Days After Transplanting',
        descriptionHi: '1 बोरी यूरिया (45kg) प्रति एकड़। दानों में दूध भरते समय पोटाश स्प्रे (00:00:50) भी दिया जा सकता है।',
        descriptionEn: '1 Bag Urea (45kg) per acre during panicle initiation.',
        recommendations: [
          { fertilizerNameHi: 'नीम कोटेड यूरिया', fertilizerNameEn: 'Neem Coated Urea', quantityPerAcre: '45 kg (1 बोरी)', notesHi: 'बाली की लम्बाई व दाना वजन', notesEn: 'Panicle length & grain weight' }
        ]
      }
    ]
  },

  crop_gram: {
    cropId: 'crop_gram',
    cropNameHi: 'चना (Gram / Chana & Pulses)',
    cropNameEn: 'Gram / Chana',
    baseDapPerAcre: 1,
    baseUreaPerAcre: 0,
    baseMopPerAcre: 0,
    zincRecommendationHi: 'राइजोबियम कल्चर (200 ग्राम) से बीज उपचारित करने से नाइट्रोजन ग्रंथियां दोगुनी बनती हैं।',
    zincRecommendationEn: 'Seed treatment with Rhizobium (200g) doubles root nodule nitrogen fixation.',
    sulphurRecommendationHi: '10 किग्रा बेंटोनाइट सल्फर बुवाई पर देने से दलहन में प्रोटीन और दानों का आकार बढ़ता है।',
    sulphurRecommendationEn: '10 kg Bentonite Sulphur improves protein synthesis and grain plumpness.',
    micronutrientAlertHi: 'चना खुद हवा से नाइट्रोजन बनाता है। यूरिया देने से पौधा सिर्फ बढ़ता रहेगा और फूल झड़ जाएंगे!',
    micronutrientAlertEn: 'Legumes fix atmospheric nitrogen. Excess Urea causes vegetative overgrowth and flower drop!',
    stages: [
      {
        stageNameHi: 'बुवाई के समय (एकमात्र मुख्य खुराक)',
        stageNameEn: 'Basal Dosage (At Sowing)',
        timelineHi: 'दिन 0 (बुवाई के साथ)',
        timelineEn: 'Day 0 (At Sowing)',
        descriptionHi: '1 बोरी DAP (50kg) + 10 किग्रा बेंटोनाइट सल्फर प्रति एकड़ बीज के नीचे दें। बाद में कोई यूरिया न डालें।',
        descriptionEn: '1 Bag DAP (50kg) + 10kg Bentonite Sulphur per acre at sowing. Zero top-dressing urea needed.',
        recommendations: [
          { fertilizerNameHi: 'DAP (18:46:0)', fertilizerNameEn: 'DAP (18:46:0)', quantityPerAcre: '50 kg (1 बोरी)', notesHi: 'जड़ों की ग्रंथियों (Nodules) हेतु फास्फोरस', notesEn: 'Essential phosphorus for nodules' },
          { fertilizerNameHi: 'बेंटोनाइट सल्फर (90%)', fertilizerNameEn: 'Bentonite Sulphur', quantityPerAcre: '10 kg', notesHi: 'प्रोटीन व रोग प्रतिरोधकता', notesEn: 'Protein & disease defense' }
        ]
      }
    ]
  },

  crop_potato: {
    cropId: 'crop_potato',
    cropNameHi: 'आलू (Potato)',
    cropNameEn: 'Potato',
    baseDapPerAcre: 2,
    baseUreaPerAcre: 2.5,
    baseMopPerAcre: 1.5,
    zincRecommendationHi: 'जिंक और बोरॉन का फोलियर स्प्रे कंदों का फटना रोकता है।',
    zincRecommendationEn: 'Zinc and Boron spray prevents hollow heart and tuber cracking.',
    sulphurRecommendationHi: 'सल्फर पोटाश के साथ मिलकर आलू के छिलके को मजबूत व चमकदार बनाता है।',
    sulphurRecommendationEn: 'Sulphur combined with Potash gives smooth, shiny skin and longer shelf life.',
    micronutrientAlertHi: 'आलू पोटाश का सबसे बड़ा उपभोक्ता है। पोटाश कम होने पर कंद छोटे रह जाते हैं।',
    micronutrientAlertEn: 'Potato is a heavy potassium feeder. Insufficient Potash leads to undersized tubers.',
    stages: [
      {
        stageNameHi: 'बुवाई के समय (बेसल खुराक)',
        stageNameEn: 'Basal Dosage (At Sowing)',
        timelineHi: 'दिन 0 (मेड़ बनाते समय)',
        timelineEn: 'Day 0 (At Ridging)',
        descriptionHi: '2 बोरी DAP + 1.5 बोरी MOP पोटाश + 1 बोरी यूरिया प्रति एकड़ बुवाई पूर्व कूड़ों में दें।',
        descriptionEn: '2 Bags DAP + 1.5 Bags MOP + 1 Bag Urea per acre in furrows before placing seed tubers.',
        recommendations: [
          { fertilizerNameHi: 'DAP (18:46:0)', fertilizerNameEn: 'DAP', quantityPerAcre: '100 kg (2 बोरी)', notesHi: 'जड़ व कंद सूत्रपात', notesEn: 'Tuber initiation' },
          { fertilizerNameHi: 'MOP पोटाश (50kg)', fertilizerNameEn: 'MOP Potash', quantityPerAcre: '75 kg (1.5 बोरी)', notesHi: 'स्टार्च संचय व आकार', notesEn: 'Starch accumulation' },
          { fertilizerNameHi: 'नीम कोटेड यूरिया', fertilizerNameEn: 'Urea', quantityPerAcre: '45 kg (1 बोरी)', notesHi: 'आरंभिक वनस्पति वृद्धि', notesEn: 'Vegetative growth' }
        ]
      },
      {
        stageNameHi: 'मिट्टी चढ़ाते समय (अर्थिंग अप)',
        stageNameEn: 'Earthing Up (Top Dressing)',
        timelineHi: '30 से 35 दिन बुवाई बाद',
        timelineEn: '30-35 Days After Sowing',
        descriptionHi: '1.5 बोरी यूरिया (67.5kg) कतारों में डालकर मिट्टी चढ़ाएं। इसके बाद नाइट्रोजन न दें।',
        descriptionEn: '1.5 Bags Urea (67.5kg) followed immediately by earthing up.',
        recommendations: [
          { fertilizerNameHi: 'नीम कोटेड यूरिया', fertilizerNameEn: 'Neem Coated Urea', quantityPerAcre: '67.5 kg (1.5 बोरी)', notesHi: 'कंदों की संख्या व तीव्र फैलाव', notesEn: 'Tuber enlargement' }
        ]
      }
    ]
  }
};

// Generic fallback profile for any other crops
export const DEFAULT_FERTILIZER_PROFILE: CropFertilizerProfile = {
  cropId: 'default',
  cropNameHi: 'सामान्य फसल (General Crop)',
  cropNameEn: 'General Crop',
  baseDapPerAcre: 1,
  baseUreaPerAcre: 1.5,
  baseMopPerAcre: 0.5,
  zincRecommendationHi: '5 किग्रा जिंक सल्फेट बुवाई पर दें।',
  zincRecommendationEn: '5 kg Zinc Sulphate at sowing.',
  sulphurRecommendationHi: '5 किग्रा सल्फर मिट्टी की उर्वरता हेतु लाभदायक है।',
  sulphurRecommendationEn: '5 kg Sulphur helps overall soil fertility.',
  micronutrientAlertHi: 'संतुलित NPK अनुपात से भूमि की गुणवत्ता व फसल उत्पादकता बनी रहती है।',
  micronutrientAlertEn: 'Balanced NPK ratio preserves soil microbiome and crop yields.',
  stages: [
    {
      stageNameHi: 'बुवाई के समय (बेसल खुराक)',
      stageNameEn: 'Basal Dosage',
      timelineHi: 'दिन 0',
      timelineEn: 'Day 0',
      descriptionHi: '1 बोरी DAP + 0.5 बोरी MOP पोटाश प्रति एकड़ बीज के नीचे दें।',
      descriptionEn: '1 Bag DAP + 0.5 Bag MOP per acre below seed level.',
      recommendations: [
        { fertilizerNameHi: 'DAP (18:46:0)', fertilizerNameEn: 'DAP (18:46:0)', quantityPerAcre: '50 kg (1 बोरी)', notesHi: 'जड़ विकास', notesEn: 'Root vigor' },
        { fertilizerNameHi: 'MOP पोटाश', fertilizerNameEn: 'MOP Potash', quantityPerAcre: '25 kg (0.5 बोरी)', notesHi: 'दाने की चमक', notesEn: 'Grain quality' }
      ]
    },
    {
      stageNameHi: 'प्रथम सिंचाई पर टॉप ड्रेसिंग',
      stageNameEn: '1st Irrigation Top Dressing',
      timelineHi: '25-30 दिन',
      timelineEn: '25-30 Days',
      descriptionHi: '1.5 बोरी यूरिया प्रति एकड़ पानी के बाद छिड़कें।',
      descriptionEn: '1.5 Bags Urea per acre after first watering.',
      recommendations: [
        { fertilizerNameHi: 'नीम कोटेड यूरिया', fertilizerNameEn: 'Neem Coated Urea', quantityPerAcre: '67.5 kg (1.5 बोरी)', notesHi: 'वनस्पति वृद्धि', notesEn: 'Vegetative growth' }
      ]
    }
  ]
};

export type SoilCondition = 'normal' | 'low_nitrogen' | 'saline' | 'sandy';

export function calculateFertilizerRequirements(
  cropId: string,
  acres: number,
  soilCondition: SoilCondition = 'normal'
) {
  const profile = CROP_FERTILIZER_DATA[cropId] || DEFAULT_FERTILIZER_PROFILE;
  const safeAcres = Math.max(0.5, acres || 1);

  let ureaModifier = 1.0;
  let dapModifier = 1.0;
  let mopModifier = 1.0;

  if (soilCondition === 'low_nitrogen') {
    ureaModifier = 1.25; // +25% nitrogen needed
  } else if (soilCondition === 'saline') {
    dapModifier = 0.9;   // slightly lower DAP, add gypsum
  } else if (soilCondition === 'sandy') {
    ureaModifier = 1.15; // extra split needed due to leaching
    mopModifier = 1.1;
  }

  const rawDapBags = profile.baseDapPerAcre * safeAcres * dapModifier;
  const rawUreaBags = profile.baseUreaPerAcre * safeAcres * ureaModifier;
  const rawMopBags = profile.baseMopPerAcre * safeAcres * mopModifier;

  const dapBags = profile.baseDapPerAcre > 0 ? Math.ceil(rawDapBags) : 0;
  const ureaBags = profile.baseUreaPerAcre > 0 ? Math.ceil(rawUreaBags) : 0;
  const mopBags = profile.baseMopPerAcre > 0 ? Math.ceil(rawMopBags) : 0;

  const dapCost = dapBags * FERTILIZER_PRICES.dap.pricePerBag;
  const ureaCost = ureaBags * FERTILIZER_PRICES.urea.pricePerBag;
  const mopCost = mopBags * FERTILIZER_PRICES.mop.pricePerBag;
  const totalCost = dapCost + ureaCost + mopCost;

  return {
    profile,
    acres: safeAcres,
    soilCondition,
    dapBags,
    ureaBags,
    mopBags,
    dapCost,
    ureaCost,
    mopCost,
    totalCost
  };
}

export function generateFertilizerWhatsAppSummary(
  calc: ReturnType<typeof calculateFertilizerRequirements>,
  farmerName: string = 'किसान साथी'
) {
  return `🌾 *किसान सहयोग (KisaanSahyog) • ICAR खाद पर्ची*
कृषक: ${farmerName}
फसल: ${calc.profile.cropNameHi}
कुल रकबा: ${calc.acres} एकड़ (${calc.soilCondition === 'normal' ? 'सामान्य मिट्टी' : calc.soilCondition === 'low_nitrogen' ? 'कम नाइट्रोजन वाली मिट्टी' : calc.soilCondition === 'saline' ? 'लवणीय/खारी मिट्टी' : 'रेतीली मिट्टी'})
━━━━━━━━━━━━━━━━━
📦 *कुल सरकारी खाद आवश्यकता (Subsidized MRP)*:
• नीम कोटेड यूरिया: ${calc.ureaBags} बोरी (₹${calc.ureaCost.toLocaleString('en-IN')})
• DAP (18:46:0): ${calc.dapBags} बोरी (₹${calc.dapCost.toLocaleString('en-IN')})
• MOP पोटाश: ${calc.mopBags} बोरी (₹${calc.mopCost.toLocaleString('en-IN')})
💰 कुल अनुमानित खर्च: ₹${calc.totalCost.toLocaleString('en-IN')}
━━━━━━━━━━━━━━━━━
⚠️ *सल्फर व सूक्ष्म पोषक अलर्ट*:
${calc.profile.micronutrientAlertHi}
${calc.profile.sulphurRecommendationHi}
━━━━━━━━━━━━━━━━━
📲 किसान सहयोग पोर्टल से प्रमाणित`;
}
