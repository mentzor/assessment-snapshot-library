import { useState, useMemo } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const ASSESSMENTS = [
  // ── INTELLIGENCE / COGNITIVE ─────────────────────────────────────────────
  {
    id: "wais4",
    name: "WAIS-IV",
    fullName: "Wechsler Adult Intelligence Scale – Fourth Edition",
    domain: "Intelligence",
    domainColor: "#2563eb",
    year: 2008,
    ages: "16–90",
    admin: "Individual, Clinician",
    time: "60–90 min",
    publisher: "Pearson",
    overview:
      "The gold-standard measure of adult intelligence. Yields a Full Scale IQ and four index scores assessing different cognitive abilities. Widely used in clinical, forensic, and research settings.",
    psychometrics: {
      reliability: "0.97 (FSIQ test-retest)",
      validity: "Extensive construct and criterion validity; converges with WASI-II (r = .89)",
      normSample: "2,200 adults stratified by age, sex, education, race/ethnicity",
      standardization: "M = 100, SD = 15 (composite); M = 10, SD = 3 (subtests)",
    },
    scales: [
      { name: "Full Scale IQ (FSIQ)", abbr: "FSIQ", mean: 100, sd: 15, min: 40, max: 160, type: "composite" },
      { name: "Verbal Comprehension Index", abbr: "VCI", mean: 100, sd: 15, min: 45, max: 155, type: "index" },
      { name: "Perceptual Reasoning Index", abbr: "PRI", mean: 100, sd: 15, min: 45, max: 155, type: "index" },
      { name: "Working Memory Index", abbr: "WMI", mean: 100, sd: 15, min: 50, max: 150, type: "index" },
      { name: "Processing Speed Index", abbr: "PSI", mean: 100, sd: 15, min: 50, max: 150, type: "index" },
    ],
    interpretRanges: [
      { label: "Extremely Low", min: 0, max: 69, color: "#dc2626", desc: "Significantly below average cognitive functioning. May indicate intellectual disability." },
      { label: "Borderline", min: 70, max: 79, color: "#ea580c", desc: "Below average. May struggle with complex reasoning tasks in daily life." },
      { label: "Low Average", min: 80, max: 89, color: "#ca8a04", desc: "Slightly below average. Functional in most everyday contexts." },
      { label: "Average", min: 90, max: 109, color: "#16a34a", desc: "Within the normal range. Encompasses approximately 50% of the population." },
      { label: "High Average", min: 110, max: 119, color: "#0891b2", desc: "Above average. Handles complex tasks with relative ease." },
      { label: "Superior", min: 120, max: 129, color: "#7c3aed", desc: "Well above average. Top 9% of population." },
      { label: "Very Superior", min: 130, max: 200, color: "#be185d", desc: "Exceptionally high cognitive ability. Top 2% of population." },
    ],
    caseStudies: [
      {
        name: "Adult Learning Evaluation",
        scores: { FSIQ: 88, VCI: 95, PRI: 82, WMI: 84, PSI: 76 },
        narrative: "A 34-year-old referred for learning difficulties at work. FSIQ in Low Average range with notable scatter. Depressed PSI warrants further investigation.",
      },
      {
        name: "Intellectual Disability Evaluation",
        scores: { FSIQ: 62, VCI: 65, PRI: 64, WMI: 58, PSI: 60 },
        narrative: "A 22-year-old with lifelong adaptive difficulties. All indices in Extremely Low range, consistent with mild intellectual disability.",
      },
    ],
    keyFacts: [
      "FSIQ has the highest reliability of any cognitive composite",
      "Discrepancies between VCI and PRI may suggest lateralized brain dysfunction",
      "PSI is particularly sensitive to TBI, ADHD, and depression",
      "Requires thorough training to administer and interpret",
    ],
  },
  {
    id: "wisc5",
    name: "WISC-V",
    fullName: "Wechsler Intelligence Scale for Children – Fifth Edition",
    domain: "Intelligence",
    domainColor: "#2563eb",
    year: 2014,
    ages: "6–16",
    admin: "Individual, Clinician",
    time: "45–65 min",
    publisher: "Pearson",
    overview:
      "The most widely used intelligence test for school-age children. Provides FSIQ and five primary index scores. Essential for learning disability evaluations, gifted assessments, and neuropsychological workups.",
    psychometrics: {
      reliability: "0.96 (FSIQ test-retest)",
      validity: "Strong convergent validity with WIAT-III (reading r = .73, math r = .74)",
      normSample: "2,200 children stratified across US demographics",
      standardization: "M = 100, SD = 15 (composites); M = 10, SD = 3 (subtests)",
    },
    scales: [
      { name: "Full Scale IQ", abbr: "FSIQ", mean: 100, sd: 15, min: 40, max: 160, type: "composite" },
      { name: "Verbal Comprehension Index", abbr: "VCI", mean: 100, sd: 15, min: 45, max: 155, type: "index" },
      { name: "Visual Spatial Index", abbr: "VSI", mean: 100, sd: 15, min: 45, max: 155, type: "index" },
      { name: "Fluid Reasoning Index", abbr: "FRI", mean: 100, sd: 15, min: 45, max: 155, type: "index" },
      { name: "Working Memory Index", abbr: "WMI", mean: 100, sd: 15, min: 50, max: 150, type: "index" },
      { name: "Processing Speed Index", abbr: "PSI", mean: 100, sd: 15, min: 50, max: 150, type: "index" },
    ],
    interpretRanges: [
      { label: "Extremely Low", min: 0, max: 69, color: "#dc2626", desc: "Significantly below average. Consistent with intellectual disability." },
      { label: "Borderline", min: 70, max: 79, color: "#ea580c", desc: "Below average. May need learning supports." },
      { label: "Low Average", min: 80, max: 89, color: "#ca8a04", desc: "Slightly below average. May qualify for certain services." },
      { label: "Average", min: 90, max: 109, color: "#16a34a", desc: "Typical development. Encompasses ~50% of children." },
      { label: "High Average", min: 110, max: 119, color: "#0891b2", desc: "Above average. Likely succeeds academically with minimal support." },
      { label: "Superior", min: 120, max: 129, color: "#7c3aed", desc: "Well above average. May benefit from enriched curriculum." },
      { label: "Very Superior", min: 130, max: 200, color: "#be185d", desc: "Gifted range. Top 2% of peers." },
    ],
    caseStudies: [
      {
        name: "Learning Disability Evaluation",
        scores: { FSIQ: 105, VCI: 115, VSI: 108, FRI: 100, WMI: 78, PSI: 72 },
        narrative: "A 10-year-old with reading difficulties. Average-High Average general ability with depressed WMI and PSI suggesting dyslexia profile. Large VCI/PSI discrepancy is clinically meaningful.",
      },
    ],
    keyFacts: [
      "New to WISC-V: Visual Spatial and Fluid Reasoning replace Perceptual Reasoning",
      "FSIQ may be misleading when index score scatter is large (>23 points)",
      "Consider GAI (General Ability Index) when WMI/PSI depress FSIQ unfairly",
      "Anchor test for most school-based psychoeducational evaluations",
    ],
  },

  // ── PERSONALITY ──────────────────────────────────────────────────────────
  {
    id: "mmpi3",
    name: "MMPI-3",
    fullName: "Minnesota Multiphasic Personality Inventory – 3rd Edition",
    domain: "Personality",
    domainColor: "#7c3aed",
    year: 2020,
    ages: "18+",
    admin: "Individual or Group, Self-Report",
    time: "25–35 min",
    publisher: "University of Minnesota Press / Pearson",
    overview:
      "The most widely researched and used objective personality and psychopathology assessment in the world. The MMPI-3 updates the MMPI-2-RF with new scales, improved norms, and enhanced validity scales.",
    psychometrics: {
      reliability: "Internal consistency α = .68–.93 across scales",
      validity: "Extensive empirical correlate literature; MMPI-2 → MMPI-3 continuity well-documented",
      normSample: "1,629 community adults; matched to 2018 US Census",
      standardization: "T-scores: M = 50, SD = 10; uniform T-scores for most scales",
    },
    scales: [
      { name: "Infrequent Responses (F-r)", abbr: "F-r", mean: 50, sd: 10, min: 38, max: 120, type: "validity" },
      { name: "Somatic Complaints (RC1)", abbr: "RC1", mean: 50, sd: 10, min: 35, max: 100, type: "rc" },
      { name: "Low Positive Emotions (RC2)", abbr: "RC2", mean: 50, sd: 10, min: 35, max: 100, type: "rc" },
      { name: "Cynicism (RC3)", abbr: "RC3", mean: 50, sd: 10, min: 35, max: 100, type: "rc" },
      { name: "Antisocial Behavior (RC4)", abbr: "RC4", mean: 50, sd: 10, min: 35, max: 100, type: "rc" },
      { name: "Ideas of Persecution (RC6)", abbr: "RC6", mean: 50, sd: 10, min: 35, max: 100, type: "rc" },
      { name: "Dysfunctional Negative Emotions (RC7)", abbr: "RC7", mean: 50, sd: 10, min: 35, max: 100, type: "rc" },
      { name: "Aberrant Experiences (RC8)", abbr: "RC8", mean: 50, sd: 10, min: 35, max: 100, type: "rc" },
      { name: "Hypomanic Activation (RC9)", abbr: "RC9", mean: 50, sd: 10, min: 35, max: 100, type: "rc" },
    ],
    interpretRanges: [
      { label: "Within Normal Limits", min: 0, max: 64, color: "#16a34a", desc: "T < 65 is generally non-elevated. Score is within expected range." },
      { label: "Elevated", min: 65, max: 74, color: "#ca8a04", desc: "T 65–74: Moderate elevation. Clinical significance likely." },
      { label: "Highly Elevated", min: 75, max: 200, color: "#dc2626", desc: "T ≥ 75: Marked elevation. Strong clinical correlates." },
    ],
    caseStudies: [
      {
        name: "Depression Profile",
        scores: { "F-r": 58, RC1: 72, RC2: 80, RC3: 55, RC4: 48, RC6: 50, RC7: 76, RC8: 55, RC9: 38 },
        narrative: "A 42-year-old with depressive symptoms. RC2 and RC7 highly elevated consistent with major depressive episode with anxious distress. RC1 moderately elevated suggesting somatic burden.",
      },
      {
        name: "Externalizing Profile",
        scores: { "F-r": 62, RC1: 48, RC2: 45, RC3: 74, RC4: 82, RC6: 68, RC7: 50, RC8: 55, RC9: 78 },
        narrative: "A 28-year-old in forensic evaluation. RC4 and RC9 highly elevated with RC3 and RC6 elevated — classic externalizing/antisocial profile.",
      },
    ],
    keyFacts: [
      "MMPI-3 reduced from 338 items (MMPI-2-RF) to 335 items",
      "Validity scales are critical — always interpret before clinical scales",
      "T-score ≥ 65 is the primary interpretive threshold",
      "Not a diagnostic instrument — provides empirical descriptors",
    ],
  },
  {
    id: "neo",
    name: "NEO-PI-3",
    fullName: "NEO Personality Inventory – 3rd Edition",
    domain: "Personality",
    domainColor: "#7c3aed",
    year: 2010,
    ages: "12+",
    admin: "Self-Report or Observer",
    time: "35–45 min",
    publisher: "PAR",
    overview:
      "The definitive measure of the Five-Factor Model (Big Five) of personality. Assesses Neuroticism, Extraversion, Openness, Agreeableness, and Conscientiousness along with six facets each. Used heavily in research and clinical settings.",
    psychometrics: {
      reliability: "Domain α = .86–.93; Facet α = .56–.83",
      validity: "Extensively validated across cultures; strong convergent/discriminant validity",
      normSample: "Numerous samples including adult community and college",
      standardization: "T-scores: M = 50, SD = 10 by gender-specific norms",
    },
    scales: [
      { name: "Neuroticism (N)", abbr: "N", mean: 50, sd: 10, min: 20, max: 80, type: "domain" },
      { name: "Extraversion (E)", abbr: "E", mean: 50, sd: 10, min: 20, max: 80, type: "domain" },
      { name: "Openness (O)", abbr: "O", mean: 50, sd: 10, min: 20, max: 80, type: "domain" },
      { name: "Agreeableness (A)", abbr: "A", mean: 50, sd: 10, min: 20, max: 80, type: "domain" },
      { name: "Conscientiousness (C)", abbr: "C", mean: 50, sd: 10, min: 20, max: 80, type: "domain" },
    ],
    interpretRanges: [
      { label: "Very Low", min: 0, max: 35, color: "#dc2626", desc: "Score is in the lowest 10% of the normative sample." },
      { label: "Low", min: 36, max: 44, color: "#ea580c", desc: "Below average. Descriptors for the low pole apply." },
      { label: "Average", min: 45, max: 55, color: "#16a34a", desc: "Within normal limits. No strong directional interpretation." },
      { label: "High", min: 56, max: 64, color: "#0891b2", desc: "Above average. Descriptors for the high pole apply." },
      { label: "Very High", min: 65, max: 200, color: "#7c3aed", desc: "Top 10%. Strong expression of the trait." },
    ],
    caseStudies: [
      {
        name: "Type A Personality Profile",
        scores: { N: 62, E: 70, O: 55, A: 38, C: 74 },
        narrative: "High Extraversion and Conscientiousness with Low Agreeableness and elevated Neuroticism — a classic competitive, achievement-driven profile.",
      },
      {
        name: "Creative Artist Profile",
        scores: { N: 58, E: 48, O: 78, A: 60, C: 42 },
        narrative: "Very High Openness with moderate Neuroticism and lower Conscientiousness — consistent with creative, emotionally sensitive personality style.",
      },
    ],
    keyFacts: [
      "The Big Five are cross-culturally robust — replicated in 50+ countries",
      "Neuroticism is the strongest predictor of psychopathology across disorders",
      "High Conscientiousness predicts academic and occupational success",
      "Observer ratings often have higher validity than self-report for some scales",
    ],
  },

  // ── CLINICAL / PSYCHOPATHOLOGY ────────────────────────────────────────────
  {
    id: "bdi2",
    name: "BDI-II",
    fullName: "Beck Depression Inventory – Second Edition",
    domain: "Clinical",
    domainColor: "#0891b2",
    year: 1996,
    ages: "13+",
    admin: "Self-Report",
    time: "5–10 min",
    publisher: "Pearson",
    overview:
      "The most widely used self-report measure of depression severity in clinical and research settings. 21 items assessing cognitive, affective, and somatic symptoms of depression consistent with DSM criteria.",
    psychometrics: {
      reliability: "Internal consistency α = .92; test-retest r = .93",
      validity: "Convergent validity with Hamilton Depression Rating Scale (r = .71)",
      normSample: "Outpatient psychiatric sample (N=500) and college students (N=120)",
      standardization: "Raw scores 0–63; cutoffs not norm-referenced",
    },
    scales: [
      { name: "Total Score", abbr: "Total", mean: null, sd: null, min: 0, max: 63, type: "total", rawScore: true },
    ],
    interpretRanges: [
      { label: "Minimal Depression", min: 0, max: 13, color: "#16a34a", desc: "Little to no depressive symptomatology currently." },
      { label: "Mild Depression", min: 14, max: 19, color: "#ca8a04", desc: "Mild symptoms. Monitor; may benefit from intervention." },
      { label: "Moderate Depression", min: 20, max: 28, color: "#ea580c", desc: "Clinically significant. Warrants intervention and monitoring." },
      { label: "Severe Depression", min: 29, max: 63, color: "#dc2626", desc: "Severe symptoms. Immediate clinical attention recommended." },
    ],
    caseStudies: [
      {
        name: "Mild Depressive Episode",
        scores: { Total: 16 },
        narrative: "A 35-year-old with 3-week history of low mood. BDI-II in Mild range. Watchful waiting with follow-up in 2 weeks is reasonable.",
      },
      {
        name: "Severe Recurrent Depression",
        scores: { Total: 38 },
        narrative: "A 52-year-old with history of MDD, currently unmedicated. Score in Severe range with elevated hopelessness item — safety assessment required.",
      },
    ],
    keyFacts: [
      "Item 9 assesses suicidal ideation directly — always review regardless of total score",
      "Not designed as a diagnostic tool — measures severity, not diagnosis",
      "Somatic items may inflate scores in medically ill populations",
      "Widely used as an outcome measure in clinical trials",
    ],
  },
  {
    id: "bai",
    name: "BAI",
    fullName: "Beck Anxiety Inventory",
    domain: "Clinical",
    domainColor: "#0891b2",
    year: 1988,
    ages: "17+",
    admin: "Self-Report",
    time: "5–10 min",
    publisher: "Pearson",
    overview:
      "A 21-item self-report measure assessing the severity of anxiety with minimal overlap with depression. Items emphasize somatic and physiological symptoms of anxiety, making it particularly useful for panic and GAD.",
    psychometrics: {
      reliability: "Internal consistency α = .92; test-retest r = .75 (1 week)",
      validity: "Discriminates anxiety from depression better than many anxiety measures",
      normSample: "Psychiatric outpatients with anxiety disorders",
      standardization: "Raw scores 0–63; criterion-referenced cutoffs",
    },
    scales: [
      { name: "Total Score", abbr: "Total", mean: null, sd: null, min: 0, max: 63, type: "total", rawScore: true },
    ],
    interpretRanges: [
      { label: "Minimal Anxiety", min: 0, max: 7, color: "#16a34a", desc: "Minimal anxiety symptoms." },
      { label: "Mild Anxiety", min: 8, max: 15, color: "#ca8a04", desc: "Mild anxiety. Monitor for escalation." },
      { label: "Moderate Anxiety", min: 16, max: 25, color: "#ea580c", desc: "Moderate anxiety symptoms. Clinical attention warranted." },
      { label: "Severe Anxiety", min: 26, max: 63, color: "#dc2626", desc: "Severe anxiety. Significant distress and functional impairment likely." },
    ],
    caseStudies: [
      {
        name: "Panic Disorder Presentation",
        scores: { Total: 32 },
        narrative: "A 29-year-old with recurrent panic attacks. BAI in Severe range reflecting the intense somatic features of panic. CBT and possible pharmacotherapy indicated.",
      },
    ],
    keyFacts: [
      "Developed to discriminate anxiety from depression (unlike earlier measures)",
      "Emphasizes somatic symptoms — may inflate in medically anxious patients",
      "Frequently paired with BDI-II for comprehensive mood screening",
      "Less sensitive to worry/cognitive aspects of GAD",
    ],
  },
  {
    id: "pcl5",
    name: "PCL-5",
    fullName: "PTSD Checklist for DSM-5",
    domain: "Clinical",
    domainColor: "#0891b2",
    year: 2013,
    ages: "18+",
    admin: "Self-Report",
    time: "5–10 min",
    publisher: "National Center for PTSD (Public Domain)",
    overview:
      "A 20-item self-report measure assessing DSM-5 PTSD symptoms across the four symptom clusters. Widely used in VA/DoD settings and PTSD research. Free to use in clinical and research settings.",
    psychometrics: {
      reliability: "Internal consistency α = .95; test-retest r = .84",
      validity: "Strong convergent validity with CAPS-5 diagnostic interview",
      normSample: "Various trauma-exposed populations including veterans and civilians",
      standardization: "Raw scores 0–80; provisional PTSD diagnosis threshold typically 31–33",
    },
    scales: [
      { name: "Total Score", abbr: "Total", mean: null, sd: null, min: 0, max: 80, type: "total", rawScore: true },
      { name: "Cluster B: Intrusion", abbr: "B", mean: null, sd: null, min: 0, max: 20, type: "cluster", rawScore: true },
      { name: "Cluster C: Avoidance", abbr: "C", mean: null, sd: null, min: 0, max: 8, type: "cluster", rawScore: true },
      { name: "Cluster D: Neg. Cognitions/Mood", abbr: "D", mean: null, sd: null, min: 0, max: 28, type: "cluster", rawScore: true },
      { name: "Cluster E: Arousal/Reactivity", abbr: "E", mean: null, sd: null, min: 0, max: 24, type: "cluster", rawScore: true },
    ],
    interpretRanges: [
      { label: "Below Threshold", min: 0, max: 30, color: "#16a34a", desc: "Below provisional PTSD threshold. Monitor if trauma history present." },
      { label: "Provisional PTSD", min: 31, max: 80, color: "#dc2626", desc: "Meets provisional threshold for PTSD. Full diagnostic interview recommended." },
    ],
    caseStudies: [
      {
        name: "Combat Veteran",
        scores: { Total: 52, B: 16, C: 6, D: 18, E: 12 },
        narrative: "A 34-year-old combat veteran 18 months post-deployment. Total score well above threshold with prominent intrusion and negative cognitions clusters. Full CAPS-5 evaluation indicated.",
      },
    ],
    keyFacts: [
      "Free to use — available at ptsd.va.gov",
      "PCL-5 maps directly onto DSM-5 criteria B, C, D, E",
      "Can be used to monitor treatment response (5-10 point change = reliable change)",
      "Always pair with a clinical interview — not sufficient for diagnosis alone",
    ],
  },

  // ── NEUROPSYCHOLOGICAL ────────────────────────────────────────────────────
  {
    id: "rbans",
    name: "RBANS",
    fullName: "Repeatable Battery for the Assessment of Neuropsychological Status",
    domain: "Neuropsychological",
    domainColor: "#059669",
    year: 1998,
    ages: "12–89",
    admin: "Individual, Clinician",
    time: "20–30 min",
    publisher: "Pearson",
    overview:
      "A brief, comprehensive neuropsychological battery. Screens for neurocognitive decline in dementia, TBI, and psychiatric disorders. Highly sensitive to early-stage Alzheimer's disease. Available in 4 alternate forms for repeated assessment.",
    psychometrics: {
      reliability: "Test-retest r = .76–.82 across indices; Total Scale r = .88",
      validity: "Sensitivity to AD = 83%; discriminates MCI from healthy aging",
      normSample: "540 community adults; age-stratified (20–89)",
      standardization: "M = 100, SD = 15 for Total Scale and Index Scores",
    },
    scales: [
      { name: "Total Scale Index", abbr: "Total", mean: 100, sd: 15, min: 40, max: 160, type: "composite" },
      { name: "Immediate Memory", abbr: "IM", mean: 100, sd: 15, min: 40, max: 160, type: "index" },
      { name: "Visuospatial/Constructional", abbr: "VSC", mean: 100, sd: 15, min: 40, max: 160, type: "index" },
      { name: "Language", abbr: "LAN", mean: 100, sd: 15, min: 40, max: 160, type: "index" },
      { name: "Attention", abbr: "ATT", mean: 100, sd: 15, min: 40, max: 160, type: "index" },
      { name: "Delayed Memory", abbr: "DM", mean: 100, sd: 15, min: 40, max: 160, type: "index" },
    ],
    interpretRanges: [
      { label: "Severely Impaired", min: 0, max: 69, color: "#dc2626", desc: "Markedly below average neurocognitive functioning." },
      { label: "Moderately Impaired", min: 70, max: 79, color: "#ea580c", desc: "Notable deficits relative to age-matched peers." },
      { label: "Mildly Impaired", min: 80, max: 89, color: "#ca8a04", desc: "Below average; possible early neurocognitive decline." },
      { label: "Average", min: 90, max: 109, color: "#16a34a", desc: "Within normal limits for age." },
      { label: "High Average", min: 110, max: 119, color: "#0891b2", desc: "Above average cognitive functioning." },
      { label: "Superior", min: 120, max: 200, color: "#7c3aed", desc: "Exceptional performance relative to age peers." },
    ],
    caseStudies: [
      {
        name: "Early Alzheimer's Disease",
        scores: { Total: 72, IM: 58, VSC: 88, LAN: 82, ATT: 90, DM: 52 },
        narrative: "A 74-year-old with family-reported memory concerns. Total Scale in Impaired range driven by severely depressed Immediate and Delayed Memory. VSC/ATT/LAN relatively preserved — pattern consistent with early AD.",
      },
      {
        name: "Mild TBI",
        scores: { Total: 85, IM: 82, VSC: 88, LAN: 90, ATT: 78, DM: 80 },
        narrative: "A 38-year-old 6 months post-mTBI. Mild impairment in Attention with generally low-average performance. Recovery trajectory should be monitored with serial assessment.",
      },
    ],
    keyFacts: [
      "Delayed Memory is typically the most sensitive index to early AD",
      "Four alternate forms allow serial monitoring without practice effects",
      "Normative data extends to age 89 — rare in neuropsychological batteries",
      "Brief enough for bedside or primary care screening",
    ],
  },
  {
    id: "trails",
    name: "TMT",
    fullName: "Trail Making Test (Parts A & B)",
    domain: "Neuropsychological",
    domainColor: "#059669",
    year: 1944,
    ages: "15–89",
    admin: "Individual, Clinician",
    time: "5–10 min",
    publisher: "Public Domain / Multiple",
    overview:
      "One of the most widely used neuropsychological tests worldwide. Part A measures processing speed and visual attention; Part B measures cognitive flexibility and executive function. Very sensitive to brain damage, aging, and cognitive decline.",
    psychometrics: {
      reliability: "Test-retest r = .76 (A), .67 (B)",
      validity: "Sensitive to frontal lobe dysfunction, TBI, dementia, ADHD",
      normSample: "Multiple normative datasets available by age and education",
      standardization: "Scores in seconds; lower = better; T-score conversion available",
    },
    scales: [
      { name: "Part A (seconds)", abbr: "A", mean: null, sd: null, min: 5, max: 300, type: "time", rawScore: true, lowerBetter: true },
      { name: "Part B (seconds)", abbr: "B", mean: null, sd: null, min: 10, max: 300, type: "time", rawScore: true, lowerBetter: true },
      { name: "B minus A (seconds)", abbr: "B-A", mean: null, sd: null, min: 0, max: 200, type: "derived", rawScore: true, lowerBetter: true },
    ],
    interpretRanges: [
      { label: "Below Average (slow)", min: 90, max: 300, color: "#dc2626", desc: "Performance below age/education expectations. Neuropsychological follow-up recommended." },
      { label: "Low Average", min: 60, max: 89, color: "#ca8a04", desc: "Mildly below average speed." },
      { label: "Average", min: 30, max: 59, color: "#16a34a", desc: "Within normal limits for most age groups (Part A)." },
      { label: "Above Average (fast)", min: 0, max: 29, color: "#7c3aed", desc: "Better than average speed and efficiency." },
    ],
    caseStudies: [
      {
        name: "Executive Dysfunction Profile",
        scores: { A: 28, B: 112, "B-A": 84 },
        narrative: "A 58-year-old with frontal meningioma. Part A is age-appropriate but Part B and B-A contrast are markedly slow — indicating specific executive/set-shifting deficit rather than general speed impairment.",
      },
    ],
    keyFacts: [
      "B-A contrast isolates executive function from pure processing speed",
      "Education has a larger effect on Part B than Part A",
      "One of the most replicated neuropsychological tests in the literature",
      "Sensitive to alcohol use, medications, fatigue, and anxiety",
    ],
  },

  // ── PERSONALITY (PROJECTIVE) ──────────────────────────────────────────────
  {
    id: "rorschach",
    name: "Rorschach",
    fullName: "Rorschach Inkblot Test (R-PAS)",
    domain: "Personality",
    domainColor: "#7c3aed",
    year: 1921,
    ages: "5+",
    admin: "Individual, Clinician",
    time: "45–90 min",
    publisher: "Hogrefe / R-PAS",
    overview:
      "The most famous projective personality assessment. Uses 10 standardized inkblots to assess personality structure, thought processes, and emotional functioning. The Rorschach Performance Assessment System (R-PAS) provides contemporary, evidence-based scoring. Widely used in forensic, clinical, and diagnostic settings.",
    psychometrics: {
      reliability: "Inter-rater reliability .80–.95 (R-PAS); test-retest varies by variable",
      validity: "Meta-analyses support validity for thought disorder, trauma, dependency, and stress coping",
      normSample: "R-PAS: International norms (N=1,200+); separate child and adult samples",
      standardization: "Standard Scores (M=100, SD=15) and percentiles for R-PAS variables",
    },
    scales: [
      { name: "Complexity (Complexity)", abbr: "Cplx", mean: 100, sd: 15, min: 40, max: 160, type: "cognitive" },
      { name: "Thought & Perception (TP-Comp)", abbr: "TP", mean: 100, sd: 15, min: 40, max: 160, type: "cognitive" },
      { name: "Stress & Distress (SC-Comp)", abbr: "SC", mean: 100, sd: 15, min: 40, max: 160, type: "affect" },
      { name: "Self & Other Representation (SR)", abbr: "SR", mean: 100, sd: 15, min: 40, max: 160, type: "interpersonal" },
      { name: "Human Movement (M)", abbr: "M", mean: 50, sd: 10, min: 20, max: 80, type: "variable" },
      { name: "Color Responses (WSumC)", abbr: "WSumC", mean: 50, sd: 10, min: 20, max: 80, type: "variable" },
    ],
    interpretRanges: [
      { label: "Significantly Low", min: 0, max: 84, color: "#dc2626", desc: "More than 1 SD below mean. Suggests deficit or constriction in this domain." },
      { label: "Low Average", min: 85, max: 99, color: "#ca8a04", desc: "Slightly below average. May indicate mild limitation." },
      { label: "Average", min: 100, max: 115, color: "#16a34a", desc: "Within normal limits. Typical functioning in this domain." },
      { label: "High Average", min: 116, max: 130, color: "#0891b2", desc: "Above average. Strength in this domain." },
      { label: "Significantly High", min: 131, max: 200, color: "#7c3aed", desc: "More than 2 SD above mean. May indicate overinvolvement or complexity." },
    ],
    caseStudies: [
      {
        name: "Schizophrenia Spectrum Profile",
        scores: { Cplx: 68, TP: 58, SC: 118, SR: 82, M: 35, WSumC: 42 },
        narrative: "A 28-year-old with first-episode psychosis. Severely depressed Thought & Perception composite with elevated Stress composite. Low M suggests thought disorder. Classic Rorschach profile for psychotic process.",
      },
      {
        name: "High-Functioning Creative Profile",
        scores: { Cplx: 125, TP: 110, SC: 95, SR: 105, M: 68, WSumC: 62 },
        narrative: "A 42-year-old artist in therapy for anxiety. High Complexity with elevated Human Movement — indicates rich inner life and psychological sophistication. No evidence of thought disorder.",
      },
    ],
    keyFacts: [
      "R-PAS (2011) represents the evidence-based evolution of Rorschach scoring",
      "Not a 'what do you see' test — coding focuses on perceptual-cognitive processes",
      "Requires extensive training (40+ hours) and supervised practice to administer competently",
      "Particularly valuable for assessing thought disorder and perceptual accuracy",
      "Unlike self-report, less susceptible to deliberate distortion or malingering",
    ],
  },

  // ── VOCATIONAL / CAREER ───────────────────────────────────────────────────
  {
    id: "sii",
    name: "Strong Interest Inventory",
    fullName: "Strong Interest Inventory® (SII)",
    domain: "Vocational",
    domainColor: "#d97706",
    year: 1927,
    ages: "14+",
    admin: "Self-Report",
    time: "35–45 min",
    publisher: "CPP",
    overview:
      "The most widely used career assessment instrument in the world. Measures interests across Holland's RIASEC model (Realistic, Investigative, Artistic, Social, Enterprising, Conventional) and provides personalized career recommendations. Used extensively in educational, clinical, and organizational career counseling.",
    psychometrics: {
      reliability: "Test-retest r = .84–.92 for General Occupational Themes over 3-6 months",
      validity: "Extensive concurrent and predictive validity; Strong predictor of occupational choice and satisfaction",
      normSample: "17,000+ employed adults across diverse occupations; normed by gender",
      standardization: "T-scores (M=50, SD=10) and standard scores for themes and scales",
    },
    scales: [
      { name: "Realistic (R)", abbr: "R", mean: 50, sd: 10, min: 20, max: 80, type: "theme" },
      { name: "Investigative (I)", abbr: "I", mean: 50, sd: 10, min: 20, max: 80, type: "theme" },
      { name: "Artistic (A)", abbr: "A", mean: 50, sd: 10, min: 20, max: 80, type: "theme" },
      { name: "Social (S)", abbr: "S", mean: 50, sd: 10, min: 20, max: 80, type: "theme" },
      { name: "Enterprising (E)", abbr: "E", mean: 50, sd: 10, min: 20, max: 80, type: "theme" },
      { name: "Conventional (C)", abbr: "C", mean: 50, sd: 10, min: 20, max: 80, type: "theme" },
    ],
    interpretRanges: [
      { label: "Very Low Interest", min: 0, max: 39, color: "#dc2626", desc: "Little to no interest in this domain. Likely to find work in this area unrewarding." },
      { label: "Low Interest", min: 40, max: 44, color: "#ea580c", desc: "Below average interest. May tolerate but unlikely to seek out." },
      { label: "Average Interest", min: 45, max: 55, color: "#16a34a", desc: "Moderate interest. Neither strong attraction nor aversion." },
      { label: "High Interest", min: 56, max: 64, color: "#0891b2", desc: "Above average interest. Likely enjoys activities in this domain." },
      { label: "Very High Interest", min: 65, max: 100, color: "#7c3aed", desc: "Strong interest. Highly motivated by activities and careers in this area." },
    ],
    caseStudies: [
      {
        name: "Science Research Profile (ISA)",
        scores: { R: 42, I: 72, A: 58, S: 48, E: 38, C: 44 },
        narrative: "A 19-year-old college student exploring majors. Very High Investigative with High Artistic — classic profile for research science, especially behavioral/social sciences. Low E suggests preference for independent work over leadership roles.",
      },
      {
        name: "Healthcare Professional (SIR)",
        scores: { R: 55, I: 68, A: 45, S: 74, E: 52, C: 48 },
        narrative: "A 32-year-old career changer. Very High Social with High Investigative — ideal for helping professions requiring scientific knowledge like nursing, physician assistant, or counseling psychology.",
      },
      {
        name: "Business/Sales Profile (ESC)",
        scores: { R: 38, I: 42, A: 40, S: 58, E: 70, C: 62 },
        narrative: "A 25-year-old in career counseling. High Enterprising, Conventional, and Social — suggests careers in business, sales, management, or organizational roles requiring persuasion and structure.",
      },
    ],
    keyFacts: [
      "Holland's RIASEC model is the most influential vocational theory in psychology",
      "Interest ≠ ability — Strong measures what you like, not what you're good at",
      "Most people show 2-3 dominant themes creating a 'Holland Code' (e.g., ISA, ESC)",
      "Interests are relatively stable after age 25 but can shift with life experiences",
      "The Strong has been continuously updated since 1927 — longest-running assessment in psychology",
      "Generates personalized lists of occupations to explore based on interest profile",
    ],
  },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────

const DOMAINS = ["All", "Intelligence", "Personality", "Clinical", "Neuropsychological", "Vocational"];
const DOMAIN_COLORS = {
  Intelligence: "#2563eb",
  Personality: "#7c3aed",
  Clinical: "#0891b2",
  Neuropsychological: "#059669",
  Vocational: "#d97706",
};
const DOMAIN_BG = {
  Intelligence: "#eff6ff",
  Personality: "#f5f3ff",
  Clinical: "#ecfeff",
  Neuropsychological: "#f0fdf4",
  Vocational: "#fef3c7",
};

function getInterpretation(ranges, score) {
  return ranges.find((r) => score >= r.min && score <= r.max) || null;
}

function ScoreBadge({ label, color }) {
  return (
    <span
      style={{
        background: color + "22",
        color: color,
        border: `1px solid ${color}55`,
        borderRadius: 6,
        padding: "2px 10px",
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: 0.5,
      }}
    >
      {label}
    </span>
  );
}

function NormBar({ score, mean, sd, min, max, color, lowerBetter }) {
  if (mean === null) return null;
  const pct = ((score - min) / (max - min)) * 100;
  const meanPct = ((mean - min) / (max - min)) * 100;
  const sd1LPct = (((mean - sd) - min) / (max - min)) * 100;
  const sd1RPct = (((mean + sd) - min) / (max - min)) * 100;

  return (
    <div style={{ margin: "6px 0 10px", position: "relative" }}>
      <div style={{ height: 18, background: "#f1f5f9", borderRadius: 9, position: "relative", overflow: "visible" }}>
        {/* ±1SD band */}
        <div
          style={{
            position: "absolute",
            left: `${Math.max(0, sd1LPct)}%`,
            width: `${Math.min(100, sd1RPct) - Math.max(0, sd1LPct)}%`,
            height: "100%",
            background: "#e2e8f0",
            borderRadius: 9,
          }}
        />
        {/* mean line */}
        <div
          style={{
            position: "absolute",
            left: `${meanPct}%`,
            width: 2,
            height: "140%",
            top: "-20%",
            background: "#94a3b8",
          }}
        />
        {/* score */}
        <div
          style={{
            position: "absolute",
            left: `${Math.max(0, Math.min(100, pct))}%`,
            transform: "translateX(-50%)",
            width: 16,
            height: 16,
            borderRadius: 8,
            background: color,
            top: 1,
            border: "2px solid white",
            boxShadow: "0 0 0 2px " + color,
          }}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#94a3b8", marginTop: 2 }}>
        <span>{min}</span>
        <span style={{ color: "#64748b" }}>Mean = {mean}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function PsychAssessmentDB() {
  const [activeView, setActiveView] = useState("browse"); // browse | detail | score | case
  const [selectedDomain, setSelectedDomain] = useState("All");
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [inputScores, setInputScores] = useState({});
  const [activeCase, setActiveCase] = useState(null);
  const [activeTab, setActiveTab] = useState("overview"); // overview | psychometrics | scoring | cases | facts

  const filtered = useMemo(
    () => ASSESSMENTS.filter((a) => selectedDomain === "All" || a.domain === selectedDomain),
    [selectedDomain]
  );

  function openAssessment(a) {
    setSelectedAssessment(a);
    setInputScores(Object.fromEntries(a.scales.map((s) => [s.abbr, s.mean || Math.round((s.min + s.max) / 2)])));
    setActiveView("detail");
    setActiveTab("overview");
    setActiveCase(null);
  }

  function loadCase(cs) {
    setInputScores({ ...cs.scores });
    setActiveCase(cs);
    setActiveTab("scoring");
  }

  const a = selectedAssessment;

  // ── CARD ──────────────────────────────────────────────────────────────────
  const AssessmentCard = ({ assessment }) => (
    <button
      onClick={() => openAssessment(assessment)}
      style={{
        background: "white",
        border: `2px solid ${assessment.domainColor}33`,
        borderRadius: 14,
        padding: "18px 20px",
        textAlign: "left",
        cursor: "pointer",
        transition: "all 0.18s",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        width: "100%",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = assessment.domainColor;
        e.currentTarget.style.boxShadow = `0 4px 16px ${assessment.domainColor}33`;
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = assessment.domainColor + "33";
        e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.06)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 10,
            background: DOMAIN_BG[assessment.domain],
            border: `2px solid ${assessment.domainColor}44`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <span style={{ fontWeight: 900, color: assessment.domainColor, fontSize: 13 }}>{assessment.name.substring(0, 4)}</span>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <span style={{ fontWeight: 800, fontSize: 16, color: "#1e293b" }}>{assessment.name}</span>
            <ScoreBadge label={assessment.domain} color={assessment.domainColor} />
          </div>
          <div style={{ fontSize: 12, color: "#64748b", marginTop: 2, fontWeight: 500 }}>{assessment.fullName}</div>
          <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 6 }}>{assessment.overview.slice(0, 100)}…</div>
          <div style={{ display: "flex", gap: 16, marginTop: 8, flexWrap: "wrap" }}>
            <span style={{ fontSize: 11, color: "#64748b" }}>📅 {assessment.year}</span>
            <span style={{ fontSize: 11, color: "#64748b" }}>👤 Ages {assessment.ages}</span>
            <span style={{ fontSize: 11, color: "#64748b" }}>⏱ {assessment.time}</span>
          </div>
        </div>
      </div>
    </button>
  );

  // ── DETAIL VIEW ───────────────────────────────────────────────────────────
  const DetailView = () => {
    if (!a) return null;
    const tabStyle = (t) => ({
      padding: "8px 18px",
      borderRadius: 8,
      fontWeight: 700,
      fontSize: 13,
      border: "none",
      cursor: "pointer",
      background: activeTab === t ? a.domainColor : "transparent",
      color: activeTab === t ? "white" : "#64748b",
      transition: "all 0.15s",
    });

    return (
      <div>
        {/* Back */}
        <button
          onClick={() => setActiveView("browse")}
          style={{ background: "none", border: "none", cursor: "pointer", color: "#64748b", fontWeight: 600, fontSize: 14, marginBottom: 16, padding: 0, display: "flex", alignItems: "center", gap: 6 }}
        >
          ← Back to All Assessments
        </button>

        {/* Header */}
        <div
          style={{
            background: `linear-gradient(135deg, ${DOMAIN_BG[a.domain]}, white)`,
            border: `2px solid ${a.domainColor}44`,
            borderRadius: 16,
            padding: "24px 28px",
            marginBottom: 20,
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                <h1 style={{ margin: 0, fontSize: 26, fontWeight: 900, color: "#1e293b" }}>{a.name}</h1>
                <ScoreBadge label={a.domain} color={a.domainColor} />
              </div>
              <div style={{ color: "#475569", fontWeight: 600, fontSize: 14, marginTop: 4 }}>{a.fullName}</div>
              <div style={{ display: "flex", gap: 20, marginTop: 10, flexWrap: "wrap" }}>
                {[["Year", a.year], ["Ages", a.ages], ["Admin", a.admin], ["Time", a.time], ["Publisher", a.publisher]].map(([k, v]) => (
                  <div key={k}>
                    <div style={{ fontSize: 10, color: "#94a3b8", fontWeight: 600, textTransform: "uppercase" }}>{k}</div>
                    <div style={{ fontSize: 13, color: "#334155", fontWeight: 700 }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 6, marginBottom: 20, flexWrap: "wrap", background: "#f8fafc", padding: 6, borderRadius: 12, border: "1px solid #e2e8f0" }}>
          {[["overview", "Overview"], ["psychometrics", "Psychometrics"], ["scoring", "Score Interpreter"], ["cases", "Case Studies"], ["facts", "Key Facts"]].map(([t, label]) => (
            <button key={t} style={tabStyle(t)} onClick={() => setActiveTab(t)}>{label}</button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div style={{ background: "white", borderRadius: 14, padding: 24, border: "1px solid #e2e8f0" }}>
            <h3 style={{ margin: "0 0 12px", color: "#1e293b" }}>About this Assessment</h3>
            <p style={{ color: "#475569", lineHeight: 1.7, margin: "0 0 20px" }}>{a.overview}</p>
            <h3 style={{ margin: "0 0 12px", color: "#1e293b" }}>Scales & Subscores</h3>
            <div style={{ display: "grid", gap: 8 }}>
              {a.scales.map((s) => (
                <div key={s.abbr} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", background: "#f8fafc", borderRadius: 10, border: "1px solid #e2e8f0" }}>
                  <div style={{ width: 52, height: 28, background: a.domainColor + "18", border: `1px solid ${a.domainColor}44`, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontSize: 11, fontWeight: 800, color: a.domainColor }}>{s.abbr}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 13, color: "#1e293b" }}>{s.name}</div>
                    <div style={{ fontSize: 11, color: "#94a3b8" }}>
                      Range: {s.min}–{s.max} {s.mean !== null ? `• M=${s.mean}, SD=${s.sd}` : "(raw score)"}
                    </div>
                  </div>
                  <ScoreBadge label={s.type} color={a.domainColor} />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "psychometrics" && (
          <div style={{ background: "white", borderRadius: 14, padding: 24, border: "1px solid #e2e8f0" }}>
            <h3 style={{ margin: "0 0 16px", color: "#1e293b" }}>Psychometric Properties</h3>
            <div style={{ display: "grid", gap: 14 }}>
              {[
                ["Reliability", a.psychometrics.reliability, "🔁"],
                ["Validity", a.psychometrics.validity, "✅"],
                ["Normative Sample", a.psychometrics.normSample, "👥"],
                ["Standardization", a.psychometrics.standardization, "📊"],
              ].map(([label, value, icon]) => (
                <div key={label} style={{ padding: "14px 18px", background: "#f8fafc", borderRadius: 12, border: "1px solid #e2e8f0" }}>
                  <div style={{ fontWeight: 800, color: "#475569", fontSize: 12, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 6 }}>{icon} {label}</div>
                  <div style={{ color: "#1e293b", lineHeight: 1.6 }}>{value}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 20, padding: "14px 18px", background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 12 }}>
              <div style={{ fontWeight: 800, color: "#92400e", fontSize: 12, marginBottom: 6 }}>⚠️ Interpretation Note</div>
              <div style={{ color: "#78350f", fontSize: 13, lineHeight: 1.6 }}>
                Psychometric properties vary by sample and context. Always consult the test manual and consider the specific population being assessed when interpreting scores.
              </div>
            </div>
          </div>
        )}

        {activeTab === "scoring" && (
          <div>
            {activeCase && (
              <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 12, padding: "12px 16px", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 18 }}>📋</span>
                <div>
                  <div style={{ fontWeight: 700, color: "#166534" }}>Case Study Loaded: {activeCase.name}</div>
                  <div style={{ color: "#15803d", fontSize: 13 }}>{activeCase.narrative}</div>
                </div>
                <button onClick={() => { setActiveCase(null); setInputScores(Object.fromEntries(a.scales.map(s => [s.abbr, s.mean || Math.round((s.min + s.max) / 2)]))); }} style={{ marginLeft: "auto", background: "none", border: "1px solid #86efac", borderRadius: 8, cursor: "pointer", color: "#166534", fontSize: 12, fontWeight: 700, padding: "4px 10px" }}>Reset</button>
              </div>
            )}

            <div style={{ background: "white", borderRadius: 14, padding: 24, border: "1px solid #e2e8f0" }}>
              <h3 style={{ margin: "0 0 6px", color: "#1e293b" }}>Score Interpreter</h3>
              <p style={{ color: "#64748b", fontSize: 13, marginBottom: 20 }}>Enter scores below to see interpretation ranges and where they fall in the normative distribution.</p>
              <div style={{ display: "grid", gap: 20 }}>
                {a.scales.map((s) => {
                  const val = inputScores[s.abbr] ?? s.mean ?? s.min;
                  const interp = getInterpretation(a.interpretRanges, val);
                  return (
                    <div key={s.abbr} style={{ padding: "16px 18px", background: "#f8fafc", borderRadius: 12, border: `1px solid ${interp ? interp.color + "44" : "#e2e8f0"}` }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
                        <div>
                          <div style={{ fontWeight: 800, color: "#1e293b", fontSize: 14 }}>{s.name}</div>
                          <div style={{ fontSize: 11, color: "#94a3b8" }}>Range: {s.min}–{s.max}</div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <input
                            type="number"
                            min={s.min}
                            max={s.max}
                            value={val}
                            onChange={(e) => setInputScores((prev) => ({ ...prev, [s.abbr]: Number(e.target.value) }))}
                            style={{ width: 70, padding: "6px 10px", borderRadius: 8, border: `2px solid ${a.domainColor}55`, fontWeight: 800, fontSize: 16, color: a.domainColor, textAlign: "center", outline: "none" }}
                          />
                          {interp && <ScoreBadge label={interp.label} color={interp.color} />}
                        </div>
                      </div>
                      <input
                        type="range"
                        min={s.min}
                        max={s.max}
                        value={val}
                        onChange={(e) => setInputScores((prev) => ({ ...prev, [s.abbr]: Number(e.target.value) }))}
                        style={{ width: "100%", accentColor: a.domainColor }}
                      />
                      <NormBar score={val} mean={s.mean} sd={s.sd} min={s.min} max={s.max} color={a.domainColor} />
                      {interp && (
                        <div style={{ fontSize: 12, color: interp.color, fontWeight: 600, marginTop: 4 }}>
                          {interp.desc}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Interpretation Legend */}
              <div style={{ marginTop: 24 }}>
                <h4 style={{ margin: "0 0 12px", color: "#1e293b", fontSize: 14 }}>Interpretation Legend</h4>
                <div style={{ display: "grid", gap: 6 }}>
                  {a.interpretRanges.map((r) => (
                    <div key={r.label} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "8px 12px", background: r.color + "0d", border: `1px solid ${r.color}33`, borderRadius: 8 }}>
                      <div style={{ width: 12, height: 12, borderRadius: 6, background: r.color, marginTop: 3, flexShrink: 0 }} />
                      <div>
                        <span style={{ fontWeight: 700, color: r.color, fontSize: 13 }}>{r.label}</span>
                        {r.min !== null && r.max < 300 && (
                          <span style={{ color: "#94a3b8", fontSize: 12 }}> ({r.min}–{r.max})</span>
                        )}
                        <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>{r.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "cases" && (
          <div style={{ display: "grid", gap: 16 }}>
            {a.caseStudies.map((cs, i) => (
              <div key={i} style={{ background: "white", borderRadius: 14, padding: 24, border: "1px solid #e2e8f0" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10, marginBottom: 12 }}>
                  <h3 style={{ margin: 0, color: "#1e293b" }}>📋 {cs.name}</h3>
                  <button
                    onClick={() => loadCase(cs)}
                    style={{ padding: "8px 18px", background: a.domainColor, color: "white", border: "none", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: 13 }}
                  >
                    Load Scores →
                  </button>
                </div>
                <p style={{ color: "#475569", lineHeight: 1.7, margin: "0 0 16px", fontStyle: "italic", borderLeft: `3px solid ${a.domainColor}`, paddingLeft: 14 }}>{cs.narrative}</p>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {Object.entries(cs.scores).map(([k, v]) => {
                    const interp = getInterpretation(a.interpretRanges, v);
                    return (
                      <div key={k} style={{ padding: "6px 12px", borderRadius: 8, background: (interp?.color || a.domainColor) + "15", border: `1px solid ${(interp?.color || a.domainColor)}44` }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase" }}>{k}</div>
                        <div style={{ fontWeight: 900, fontSize: 18, color: interp?.color || a.domainColor }}>{v}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "facts" && (
          <div style={{ background: "white", borderRadius: 14, padding: 24, border: "1px solid #e2e8f0" }}>
            <h3 style={{ margin: "0 0 16px", color: "#1e293b" }}>Key Clinical & Psychometric Facts</h3>
            <div style={{ display: "grid", gap: 10 }}>
              {a.keyFacts.map((f, i) => (
                <div key={i} style={{ display: "flex", gap: 12, padding: "12px 16px", background: DOMAIN_BG[a.domain], borderRadius: 10, border: `1px solid ${a.domainColor}33` }}>
                  <div style={{ width: 26, height: 26, borderRadius: 13, background: a.domainColor, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ color: "white", fontWeight: 900, fontSize: 13 }}>{i + 1}</span>
                  </div>
                  <div style={{ color: "#334155", lineHeight: 1.6, paddingTop: 2 }}>{f}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  // ── RENDER ────────────────────────────────────────────────────────────────
  return (
    <div style={{ fontFamily: "'Georgia', serif", minHeight: "100vh", background: "#f8fafc", color: "#1e293b" }}>
      {/* Header */}
      <div style={{ background: "white", borderBottom: "2px solid #e2e8f0", padding: "20px 32px", display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap", position: "sticky", top: 0, zIndex: 100 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 900, color: "#1e293b", fontFamily: "Georgia, serif" }}>
            Ψ Assessment Snapshot Library
          </h1>
          <p style={{ margin: 0, fontSize: 12, color: "#94a3b8", fontFamily: "sans-serif" }}>
            Graduate Psychology Training Tool · {ASSESSMENTS.length} Assessments
          </p>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 10, flexWrap: "wrap" }}>
          {DOMAINS.map((d) => (
            <button
              key={d}
              onClick={() => { setSelectedDomain(d); setActiveView("browse"); }}
              style={{
                padding: "6px 14px",
                borderRadius: 20,
                border: selectedDomain === d ? `2px solid ${DOMAIN_COLORS[d] || "#334155"}` : "2px solid #e2e8f0",
                background: selectedDomain === d ? (DOMAIN_BG[d] || "#f1f5f9") : "white",
                color: selectedDomain === d ? (DOMAIN_COLORS[d] || "#334155") : "#64748b",
                fontWeight: 700,
                fontSize: 13,
                cursor: "pointer",
                fontFamily: "sans-serif",
                transition: "all 0.15s",
              }}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Main */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "28px 24px" }}>
        {activeView === "browse" && (
          <div>
            <div style={{ marginBottom: 20 }}>
              <h2 style={{ margin: "0 0 4px", fontSize: 18, color: "#1e293b" }}>
                {selectedDomain === "All" ? "All Assessments" : selectedDomain + " Assessments"} ({filtered.length})
              </h2>
              <p style={{ margin: 0, color: "#64748b", fontSize: 13, fontFamily: "sans-serif" }}>
                Click any assessment to explore its scales, psychometrics, scoring, and case studies.
              </p>
            </div>
            <div style={{ display: "grid", gap: 14 }}>
              {filtered.map((a) => <AssessmentCard key={a.id} assessment={a} />)}
            </div>

            {/* Domain Overview Cards */}
            <div style={{ marginTop: 32 }}>
              <h3 style={{ margin: "0 0 16px", color: "#475569", fontSize: 16, fontFamily: "sans-serif", fontWeight: 700 }}>Psychometric Quick Reference</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
                {[
                  { label: "Standard Score", desc: "M=100, SD=15", ex: "IQ scores, RBANS", color: "#2563eb" },
                  { label: "T-Score", desc: "M=50, SD=10", ex: "MMPI-3, NEO-PI-3", color: "#7c3aed" },
                  { label: "Scaled Score", desc: "M=10, SD=3", ex: "WAIS-IV subtests", color: "#0891b2" },
                  { label: "Raw Score", desc: "Sum of items", ex: "BDI-II, BAI, PCL-5", color: "#059669" },
                ].map((item) => (
                  <div key={item.label} style={{ background: "white", border: `2px solid ${item.color}33`, borderRadius: 12, padding: "14px 16px" }}>
                    <div style={{ fontWeight: 800, color: item.color, fontSize: 14 }}>{item.label}</div>
                    <div style={{ fontWeight: 700, color: "#1e293b", fontSize: 18, margin: "4px 0" }}>{item.desc}</div>
                    <div style={{ fontSize: 11, color: "#94a3b8" }}>e.g. {item.ex}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeView === "detail" && <DetailView />}
      </div>

      {/* Footer */}
      <div style={{ borderTop: "1px solid #e2e8f0", padding: "16px 32px", textAlign: "center", color: "#94a3b8", fontSize: 11, fontFamily: "sans-serif", background: "white", marginTop: 40 }}>
        For educational purposes only. Always consult test manuals and qualified supervisors for clinical assessment.
      </div>
    </div>
  );
}
