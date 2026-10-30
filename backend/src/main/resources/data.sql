-- Seed Data for EduSphere Science Learning Platform
-- elearning_db

-- Clean up existing seed data if any
DELETE FROM quiz_submissions;
DELETE FROM lesson_completions;
DELETE FROM enrollments;
DELETE FROM quiz_questions;
DELETE FROM quizzes;
DELETE FROM lessons;
DELETE FROM courses;
DELETE FROM users;

-- 1. Insert Users (Password: password123)
INSERT INTO users (id, username, email, password, full_name, role, avatar_url) VALUES
(1, 'john_student', 'student@elearn.com', 'password123', 'John Doe', 'STUDENT', 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'),
(2, 'dr_emily', 'instructor@elearn.com', 'password123', 'Dr. Emily Watson', 'INSTRUCTOR', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80'),
(3, 'admin_alex', 'admin@elearn.com', 'password123', 'Alex Mercer', 'ADMIN', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80');

-- 2. Insert Courses (Physics, Chemistry, Mathematics, Biology)
INSERT INTO courses (id, title, description, category, level, duration, thumbnail_url, instructor_name, rating) VALUES
(1, 'Physics: Mechanics to Modern Physics', 'A comprehensive journey through classical and modern physics. Covers Newton''s Laws, energy, waves, electrostatics, and quantum mechanics with clear explanations and real-world applications.', 'Physics', 'Intermediate', '6 Weeks', 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=800&q=80', 'Dr. Sarah Mitchell', 4.9),

(2, 'Chemistry: From Atoms to Electrochemistry', 'Explore the building blocks of matter. Understand atomic structure, chemical bonding, states of matter, equilibrium, and electrochemistry through structured lessons and interactive assessments.', 'Chemistry', 'Beginner', '5 Weeks', 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80', 'Prof. James Chen', 4.8),

(3, 'Mathematics: Calculus, Trigonometry & Matrices', 'Master key mathematical concepts from functions and trigonometry to differential calculus, integral calculus, and matrix algebra - complete with worked examples and concept explanations.', 'Mathematics', 'Intermediate', '6 Weeks', 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80', 'Dr. Priya Sharma', 4.9),

(4, 'Biology: Cells, Genetics & Ecosystems', 'Dive into the living world - from cell structure and genetics to human physiology, ecology, and evolution. Engaging content with crisp explanations suited for students and enthusiasts alike.', 'Biology', 'Beginner', '5 Weeks', 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=800&q=80', 'Dr. Emma Collins', 4.8);

-- 3. Insert Topics/Lessons (5 per course)

-- Course 1: Physics
INSERT INTO lessons (id, course_id, title, content, video_url, duration, sequence_order) VALUES
(1, 1, 'Newton''s Laws of Motion',
 'Newton''s Three Laws form the foundation of classical mechanics. The First Law (Law of Inertia) states that an object at rest stays at rest and an object in motion stays in motion at constant velocity unless acted upon by a net external force. The Second Law defines force as F = ma — greater force on the same mass produces greater acceleration. The Third Law states that for every action there is an equal and opposite reaction. Key applications: calculating net force, understanding friction, analyzing collisions. Concepts to master: free-body diagrams, normal force, tension, and weight (W = mg). The concept of inertia explains why passengers lurch forward when a car brakes suddenly. Friction (f = μN) opposes relative motion between surfaces.',
 NULL, '20 min read', 1),

(2, 1, 'Work, Energy & Power',
 'Work is done when a force causes displacement in the direction of the force: W = F × d × cos θ. If the force is perpendicular to displacement, no work is done. Energy exists in many forms — kinetic energy (KE = ½mv²) is energy of motion, and gravitational potential energy (PE = mgh) is energy due to position. The Work-Energy Theorem states: net work done = change in kinetic energy (W_net = ΔKE). The Law of Conservation of Energy: energy is never created or destroyed, only transformed between forms. Power is the rate of doing work: P = W/t = F × v (measured in Watts). Efficiency = (Useful Output Energy / Total Input Energy) × 100%. Springs store elastic potential energy: PE_spring = ½kx² where k is spring constant and x is compression/extension.',
 NULL, '18 min read', 2),

(3, 1, 'Waves & Oscillations',
 'A wave transfers energy through a medium without transporting matter. Key wave parameters: wavelength (λ) — distance between successive crests, frequency (f) — cycles per second (Hz), amplitude (A) — maximum displacement, wave speed (v = fλ). Transverse waves oscillate perpendicular to propagation (light, water waves). Longitudinal waves oscillate parallel to propagation (sound). Simple Harmonic Motion (SHM) occurs when restoring force is proportional to displacement: F = -kx. Period of a simple pendulum: T = 2π√(L/g). The Doppler Effect: frequency appears higher as a source approaches and lower as it moves away — explains ambulance siren pitch change. Resonance occurs when driving frequency matches a system''s natural frequency, causing large-amplitude oscillations. Sound intensity measured in decibels (dB).',
 NULL, '22 min read', 3),

(4, 1, 'Electrostatics',
 'Electrostatics studies electric charges at rest. Like charges repel; unlike charges attract. Coulomb''s Law gives the force between two point charges: F = kq₁q₂/r² (k = 9×10⁹ Nm²/C²). Electric field E = F/q represents force per unit positive charge — field lines point away from positive charges and toward negative. Electric potential V = W/q measures work done per unit positive charge. Relationship: E = -dV/dr. Gauss''s Law: total electric flux through any closed surface equals the enclosed charge divided by ε₀ (permittivity of free space). Capacitors store charge: C = Q/V; energy stored = ½CV² = ½QV. Series capacitors: 1/C_total = Σ(1/Cᵢ). Parallel capacitors: C_total = ΣCᵢ. Dielectrics increase capacitance by factor κ (dielectric constant). Applications: capacitors in circuits, lightning protection, inkjet printers.',
 NULL, '24 min read', 4),

(5, 1, 'Modern Physics & Quantum Mechanics',
 'Modern Physics revolutionized our understanding of nature at atomic scales. Einstein''s Special Relativity introduced mass-energy equivalence: E = mc². Time dilation: moving clocks run slower. Length contraction: moving objects appear shortened. The Photoelectric Effect (Einstein, 1905, Nobel Prize) proved light travels as discrete quanta called photons, each with energy E = hf (h = Planck''s constant = 6.626×10⁻³⁴ Js). The photoelectric effect cannot be explained by wave theory — it proves the particle nature of light. De Broglie''s hypothesis: matter has wave properties with wavelength λ = h/mv (wave-particle duality). Heisenberg''s Uncertainty Principle: Δx × Δp ≥ ℏ/2 — cannot simultaneously know exact position and momentum. Bohr''s atomic model: electrons occupy quantized orbits; energy emitted as photons when electrons drop to lower levels. Nuclear fission (splitting heavy nuclei) and fusion (combining light nuclei) release enormous energy from mass defect.',
 NULL, '25 min read', 5);

-- Course 2: Chemistry
INSERT INTO lessons (id, course_id, title, content, video_url, duration, sequence_order) VALUES
(6, 2, 'Atomic Structure & Periodic Table',
 'An atom consists of a nucleus (protons + neutrons) surrounded by electrons in shells. Atomic number (Z) = number of protons — defines the element. Mass number (A) = protons + neutrons. Isotopes have the same atomic number but different mass numbers (e.g., C-12, C-14). Electrons occupy shells with capacity 2n² — shell 1: 2, shell 2: 8, shell 3: 18. Quantum numbers describe each electron: principal (n), azimuthal (l), magnetic (mₗ), spin (mₛ). Aufbau principle: fill lowest energy orbitals first. Hund''s rule: maximize unpaired electrons in degenerate orbitals. The Modern Periodic Table arranges 118 elements by increasing atomic number into 18 groups and 7 periods. Periodic trends — atomic radius decreases across a period (nuclear charge increases); ionization energy and electronegativity increase across periods and decrease down groups. Valence electrons determine chemical behavior. Noble gases (Group 18) are inert with complete outer shells.',
 NULL, '20 min read', 1),

(7, 2, 'Chemical Bonding',
 'Chemical bonds hold atoms together and determine molecular properties. Ionic bonds form by complete electron transfer between metals (low electronegativity) and non-metals (high electronegativity), producing oppositely charged ions. Example: Na gives e⁻ to Cl → Na⁺Cl⁻ (sodium chloride). Ionic compounds have high melting points and conduct electricity when dissolved. Covalent bonds form by electron sharing between non-metals. Single bond: 1 shared pair (H₂). Double bond: 2 shared pairs (O₂). Triple bond: 3 shared pairs (N₂). VSEPR Theory predicts molecular shape based on electron-pair repulsion — lone pairs repel more than bonding pairs. Examples: H₂O is bent (2 lone pairs), NH₃ is trigonal pyramidal, CH₄ is tetrahedral. Polarity depends on electronegativity difference and molecular geometry. Metallic bonds involve a sea of delocalized electrons, explaining conductivity, malleability, and metallic luster. Intermolecular forces: hydrogen bonds (strongest), dipole-dipole, London dispersion — determine boiling/melting points.',
 NULL, '22 min read', 2),

(8, 2, 'States of Matter',
 'Matter exists in three common states. Solids: definite shape and volume, tightly packed particles with strong intermolecular forces — crystalline (regular pattern) or amorphous (irregular). Liquids: definite volume but take container''s shape — particles close together but can flow. Gases: no definite shape or volume — particles far apart and move randomly. Gas Laws: Boyle''s Law (constant T) — P₁V₁ = P₂V₂; Charles''s Law (constant P) — V₁/T₁ = V₂/T₂; Gay-Lussac''s Law (constant V) — P₁/T₁ = P₂/T₂; Combined: P₁V₁/T₁ = P₂V₂/T₂; Ideal Gas Law: PV = nRT (R = 8.314 J/mol·K). Dalton''s Law of Partial Pressures: P_total = ΣP_i. Kinetic Molecular Theory: gas particles are in constant random motion; average kinetic energy ∝ temperature. Real gases deviate from ideal at high pressure and low temperature (van der Waals equation). Phase transitions: melting (solid→liquid), vaporization (liquid→gas), sublimation (solid→gas), deposition, condensation, freezing.',
 NULL, '20 min read', 3),

(9, 2, 'Chemical Equilibrium',
 'Chemical equilibrium is a dynamic state where forward and reverse reaction rates are equal and macroscopic concentrations remain constant. For aA + bB ⇌ cC + dD, equilibrium constant Kc = [C]^c[D]^d / [A]^a[B]^b (square brackets = molar concentrations). Pure solids and liquids are excluded from Kc expressions. Large Kc (>>1) means products favored; small Kc (<<1) means reactants favored. Kp uses partial pressures for gas-phase equilibria; Kp = Kc(RT)^Δn. Le Chatelier''s Principle: when a system at equilibrium is stressed, it shifts to oppose the stress. Adding reactant → shifts right (more products). Removing product → shifts right. Increasing pressure → shifts toward fewer gas moles. Increasing temperature → shifts toward endothermic direction. Catalysts increase reaction rate but do NOT change equilibrium position. Haber Process: N₂ + 3H₂ ⇌ 2NH₃ (ΔH = -92 kJ/mol) — high pressure, moderate temperature, iron catalyst. Degree of dissociation (α): fraction of reactant that has decomposed at equilibrium.',
 NULL, '23 min read', 4),

(10, 2, 'Electrochemistry',
 'Electrochemistry studies the interconversion of chemical energy and electrical energy through redox reactions. Oxidation: loss of electrons (OIL). Reduction: gain of electrons (RIG). In galvanic (voltaic) cells, spontaneous redox reactions generate electrical energy. Components: anode (oxidation, negative terminal), cathode (reduction, positive terminal), salt bridge (maintains electrical neutrality). Standard electrode potential (E°) measures tendency to gain electrons. Cell EMF: E°_cell = E°_cathode - E°_anode. Positive E°_cell = spontaneous reaction. Nernst Equation: E = E° - (RT/nF)lnQ — EMF depends on concentration. The Daniell Cell: Zn | Zn²⁺ || Cu²⁺ | Cu, E°_cell = +1.10 V. Electrolytic cells use external electrical energy to drive non-spontaneous reactions: electrolysis of water, electroplating (e.g., silver plating). Faraday''s First Law: mass deposited ∝ charge passed (Q = It). Faraday''s Second Law: same charge deposits proportional equivalent masses of different substances. 1 Faraday = 96,485 C/mol e⁻. Applications: batteries, fuel cells, electroplating, corrosion, aluminum smelting.',
 NULL, '25 min read', 5);

-- Course 3: Mathematics
INSERT INTO lessons (id, course_id, title, content, video_url, duration, sequence_order) VALUES
(11, 3, 'Sets, Relations & Functions',
 'A set is a well-defined collection of distinct objects denoted with curly braces: A = {1, 2, 3}. Types: empty set (∅), finite, infinite, universal (U). Operations: Union A∪B (elements in A or B), Intersection A∩B (in both), Difference A-B (in A but not B), Complement A'' (not in A). De Morgan''s Laws: (A∪B)'' = A''∩B'' and (A∩B)'' = A''∪B''. A relation R from A to B is any subset of A×B (Cartesian product). Types of relations: reflexive (aRa), symmetric (aRb → bRa), transitive (aRb, bRc → aRc). An equivalence relation is reflexive, symmetric, and transitive. A function f: A→B assigns each element in domain A exactly one element in codomain B. Types: one-one/injective (distinct inputs → distinct outputs), onto/surjective (every codomain element has a preimage), bijective (both). Composition: (f∘g)(x) = f(g(x)). Inverse f⁻¹ exists only for bijective functions. Even function: f(-x) = f(x). Odd function: f(-x) = -f(x).',
 NULL, '20 min read', 1),

(12, 3, 'Trigonometry',
 'Trigonometry relates angles and sides of triangles. Right triangle ratios: sin θ = opp/hyp, cos θ = adj/hyp, tan θ = opp/adj, cosec θ = 1/sinθ, sec θ = 1/cosθ, cot θ = 1/tanθ. Fundamental identities: sin²θ + cos²θ = 1, 1 + tan²θ = sec²θ, 1 + cot²θ = cosec²θ. The ASTC rule (All-Sin-Tan-Cos) gives signs in each quadrant. Addition formulas: sin(A±B) = sinA cosB ± cosA sinB; cos(A±B) = cosA cosB ∓ sinA sinB; tan(A±B) = (tanA ± tanB)/(1 ∓ tanA tanB). Double angle: sin2θ = 2sinθcosθ; cos2θ = cos²θ - sin²θ = 1 - 2sin²θ = 2cos²θ - 1; tan2θ = 2tanθ/(1-tan²θ). Product-to-Sum and Sum-to-Product formulas simplify expressions. Inverse functions: arcsin (range [-π/2, π/2]), arccos (range [0,π]), arctan (range (-π/2, π/2)). Sine Rule: a/sinA = b/sinB = c/sinC = 2R. Cosine Rule: c² = a² + b² - 2ab cosC. Graphs of sinθ and cosθ are periodic with period 2π and amplitude 1; tanθ has period π.',
 NULL, '22 min read', 2),

(13, 3, 'Calculus: Limits & Derivatives',
 'A limit describes the value a function approaches: lim(x→a) f(x) = L. Limit laws allow algebraic manipulation. L''Hôpital''s Rule resolves 0/0 and ∞/∞ indeterminate forms: lim f/g = lim f''/g''. Continuity at x=a requires: f(a) exists, the limit exists, and they are equal. Three conditions: f(a) defined, limit exists, limit = f(a). Derivative definition: f''(x) = lim(h→0)[f(x+h)-f(x)]/h — instantaneous rate of change (slope of tangent). Standard results: d/dx(xⁿ) = nxⁿ⁻¹; d/dx(sin x) = cos x; d/dx(cos x) = -sin x; d/dx(eˣ) = eˣ; d/dx(ln x) = 1/x; d/dx(aˣ) = aˣ ln a. Rules: Product: (uv)'' = u''v + uv''; Quotient: (u/v)'' = (u''v-uv'')/v²; Chain: dy/dx = dy/du × du/dx. Implicit differentiation for relations. Applications: finding slope of tangent/normal at a point; maxima/minima by setting f''(x) = 0 then using second derivative test (f''''(x) > 0 → local min; f''''(x) < 0 → local max); increasing/decreasing intervals; curve sketching; velocity (v = ds/dt) and acceleration (a = dv/dt).',
 NULL, '25 min read', 3),

(14, 3, 'Integral Calculus',
 'Integration is the reverse of differentiation — finding antiderivatives. Indefinite integral: ∫f(x)dx = F(x) + C where F''(x) = f(x) and C is the constant of integration. Standard integrals: ∫xⁿdx = xⁿ⁺¹/(n+1)+C (n≠-1); ∫(1/x)dx = ln|x|+C; ∫eˣdx = eˣ+C; ∫sin x dx = -cos x+C; ∫cos x dx = sin x+C; ∫sec²x dx = tan x+C; ∫aˣdx = aˣ/ln a + C. Integration methods: Substitution (u-sub) — replace part of integrand with u to simplify; Integration by Parts — ∫u dv = uv - ∫v du (choose u using LIATE: Logarithm, Inverse trig, Algebraic, Trigonometric, Exponential); Partial Fractions — decompose rational functions. Fundamental Theorem of Calculus: definite integral ∫ₐᵇf(x)dx = F(b) - F(a). The definite integral gives signed area under the curve. Area between two curves: ∫ₐᵇ[f(x) - g(x)]dx. Volume of revolution (disc method): V = π∫ₐᵇ[f(x)]²dx. Applications: area, volume, arc length, work, centre of mass, probability (PDF integration).',
 NULL, '24 min read', 4),

(15, 3, 'Matrices & Determinants',
 'A matrix is a rectangular array of numbers arranged in m rows and n columns (order m×n). Square matrix: m = n. Row matrix: m = 1. Column matrix: n = 1. Special matrices: Identity (I) has 1s on diagonal; Zero matrix (O); Diagonal matrix; Symmetric (Aᵀ = A); Skew-symmetric (Aᵀ = -A). Operations: Addition/Subtraction — same order, add corresponding elements. Scalar multiplication. Matrix multiplication: C = AB where Cᵢⱼ = ΣAᵢₖBₖⱼ (requires cols of A = rows of B; not commutative in general). Transpose Aᵀ: interchange rows and columns. Determinant |A| — for 2×2: |A| = ad - bc; for 3×3: cofactor expansion along any row/column. Properties: det(AB) = det(A)·det(B); det(Aᵀ) = det(A); det(kA) = kⁿdet(A). Adjoint (adj A) = transpose of cofactor matrix. Inverse A⁻¹ = adj(A)/|A| — exists only when |A| ≠ 0 (non-singular). Solving linear equations: AX = B → X = A⁻¹B (matrix method) or Cramer''s rule: xᵢ = |Aᵢ|/|A|. Rank of a matrix: size of largest non-zero sub-determinant — determines consistency of linear systems.',
 NULL, '23 min read', 5);

-- Course 4: Biology
INSERT INTO lessons (id, course_id, title, content, video_url, duration, sequence_order) VALUES
(16, 4, 'Cell Structure & Function',
 'The cell is the fundamental structural and functional unit of life. All organisms are made of one or more cells (Cell Theory). Prokaryotic cells (bacteria, archaea) lack a membrane-bound nucleus — DNA is in the nucleoid region. Eukaryotic cells (plants, animals, fungi, protists) have a true membrane-bound nucleus. Key organelles: Nucleus — contains DNA, controls cell activities, has nuclear pores and nucleolus (ribosome production site). Mitochondria — powerhouse of the cell; site of aerobic cellular respiration producing ATP; has double membrane; own DNA (endosymbiont theory). Ribosomes — site of protein synthesis; found free in cytoplasm or bound to rough ER. Endoplasmic Reticulum — rough ER (studded with ribosomes, protein processing) and smooth ER (lipid synthesis, detoxification). Golgi Apparatus — sorts, packages, and ships proteins/lipids. Lysosomes — contain digestive enzymes for intracellular digestion. Chloroplasts (plant cells only) — site of photosynthesis; contain chlorophyll; double membrane + thylakoids + stroma. Vacuoles — large central vacuole in plant cells for turgor pressure. Cell wall (plant, fungi, bacteria) — provides rigidity. Cell membrane (phospholipid bilayer, fluid mosaic model): semi-permeable, controls transport via diffusion, osmosis, active transport, endocytosis, and exocytosis.',
 NULL, '25 min read', 1),

(17, 4, 'Genetics & Heredity',
 'Genetics studies how traits are inherited and how variation arises. Gregor Mendel (1860s) established foundational laws using pea plants. Law of Segregation: each organism carries two alleles for each trait; alleles separate during gamete formation so each gamete carries only one allele. Law of Independent Assortment: genes on different chromosomes assort independently during meiosis (applies to non-linked genes). Key terms: gene (segment of DNA coding for a trait); allele (alternate forms of a gene); locus (position of gene on chromosome); genotype (genetic makeup, e.g., Aa, BB); phenotype (observable trait). Dominant allele (A) masks recessive allele (a). Homozygous: AA or aa. Heterozygous: Aa. Punnett squares predict offspring genotype/phenotype ratios. Monohybrid cross: Aa × Aa → 1AA:2Aa:1aa (3:1 phenotype ratio). Dihybrid cross (AaBb × AaBb): 9:3:3:1 phenotype ratio. Incomplete dominance: neither allele fully dominant (Rr → pink flowers). Codominance: both alleles expressed (AB blood type). Multiple alleles: ABO blood group system (Iᴬ, Iᴮ, i). Sex-linked traits carried on X chromosome (e.g., colour blindness, haemophilia) — more common in males (XY). DNA structure: double helix of nucleotides with complementary base pairing (A-T, G-C). Transcription: DNA → mRNA in nucleus. Translation: mRNA → protein at ribosomes using tRNA and codons. Mutations: point mutations (SNPs), frameshift mutations (insertions/deletions) — can be silent, missense, or nonsense.',
 NULL, '25 min read', 2),

(18, 4, 'Human Physiology',
 'Human physiology studies how body systems work together to maintain life and homeostasis. Digestive System: ingestion → digestion → absorption → egestion. Mouth (mechanical digestion, salivary amylase breaks starch); Oesophagus (peristalsis); Stomach (pepsin, HCl, churning → chyme); Small intestine (main absorption site — villi and microvilli increase surface area; pancreatic enzymes: lipase, protease, amylase; bile emulsifies fats); Large intestine (water/salt absorption, faeces formation). Respiratory System: diaphragm contraction → inhalation; trachea → bronchi → bronchioles → alveoli (thin walls, moist, rich blood supply for O₂/CO₂ exchange). Circulatory System: heart has 4 chambers — right side pumps deoxygenated blood to lungs (pulmonary circuit); left side pumps oxygenated blood to body (systemic circuit). Arteries carry blood from heart; veins carry blood to heart; capillaries enable exchange. Nervous System: central (brain + spinal cord) and peripheral (cranial + spinal nerves). Neurons transmit electrical impulses. Synapse: neurotransmitters cross synaptic cleft. Reflex arc (receptor → sensory neuron → relay neuron → motor neuron → effector) bypasses brain for fast responses. Endocrine System (hormones): insulin/glucagon (blood glucose), adrenaline (fight-or-flight), thyroxine (metabolic rate), ADH (water balance), testosterone/oestrogen (secondary sex characteristics). Excretory System: kidneys filter blood forming urine (glomerulus filtration, tubule reabsorption). Nephron is the functional unit of the kidney.',
 NULL, '28 min read', 3),

(19, 4, 'Ecology & Environment',
 'Ecology studies relationships between living organisms and their environment. Levels of organisation: individual → population (same species, same area) → community (all populations in an area) → ecosystem (community + abiotic environment) → biome → biosphere. Abiotic factors: temperature, light, water, soil pH, salinity. Biotic factors: predation, competition, symbiosis. Feeding relationships: producers (autotrophs — plants perform photosynthesis); primary consumers (herbivores); secondary consumers (carnivores); tertiary consumers; decomposers (bacteria, fungi) break down dead organic matter. Food chain: Grass → Grasshopper → Frog → Snake → Eagle. Food web: complex, interconnected food chains. Energy flow: only ~10% of energy passes to the next trophic level (10% rule / ecological efficiency) — rest lost as heat. Pyramids of number, biomass, and energy. Biogeochemical Cycles: Carbon cycle (photosynthesis removes CO₂; respiration, decomposition, combustion release CO₂); Nitrogen cycle (fixation by bacteria/lightning, nitrification, denitrification); Water cycle (evaporation, condensation, precipitation, transpiration). Biomes: tropical rainforest (high biodiversity), savanna, desert, temperate deciduous forest, taiga, tundra, ocean. Human impacts: deforestation, habitat loss, pollution (air, water, soil), climate change (enhanced greenhouse effect from CO₂, CH₄), ozone depletion, plastic waste. Biodiversity importance: ecosystem stability, medicines, food security. Conservation: national parks, biosphere reserves, ex-situ conservation (zoos, seed banks), legislation.',
 NULL, '26 min read', 4),

(20, 4, 'Evolution & Adaptation',
 'Evolution is the gradual change in heritable characteristics of biological populations over successive generations. Charles Darwin (1859, "On the Origin of Species") proposed Natural Selection as the mechanism: (1) Variation exists among individuals; (2) Some variations are heritable; (3) More offspring are produced than can survive; (4) Individuals with favorable variations survive and reproduce more (differential reproduction = survival of the fittest). Evidence for evolution: Fossil record (chronological sequence of life forms); Comparative anatomy — homologous structures (same origin, different function, e.g., human arm, whale flipper, bird wing); analogous structures (different origin, same function, e.g., bird wing, butterfly wing); vestigial organs (appendix, coccyx); Molecular evidence — DNA/protein sequence similarities reflect evolutionary relatedness; Biogeography — distribution of species matches evolutionary history. Adaptation: an inherited characteristic increasing fitness in a specific environment. Camouflage, mimicry, antibiotic resistance. Speciation: formation of new species. Allopatric speciation: geographic barrier → reproductive isolation → divergence. Sympatric speciation: within same area (polyploidy in plants). Hardy-Weinberg Principle: allele frequencies remain constant in a non-evolving population (no mutation, no migration, random mating, large population, no selection). Modern Evolutionary Synthesis combines Darwin''s natural selection with Mendelian genetics, population genetics, and molecular biology. Human evolution: australopithecines → Homo habilis → Homo erectus → Homo sapiens (over ~6 million years).',
 NULL, '25 min read', 5);

-- 4. Insert Quizzes (one per course)
INSERT INTO quizzes (id, course_id, title, description, passing_score, time_limit_mins) VALUES
(1, 1, 'Physics Knowledge Assessment', 'Test your understanding of Newton''s Laws, energy, waves, electrostatics, and modern physics.', 60, 10),
(2, 2, 'Chemistry Concepts Quiz', 'Assess your grasp of atomic structure, bonding, states of matter, equilibrium, and electrochemistry.', 60, 10),
(3, 3, 'Mathematics Skills Test', 'Evaluate your knowledge of functions, trigonometry, calculus, integration, and matrices.', 60, 10),
(4, 4, 'Biology Understanding Check', 'Demonstrate your knowledge of cells, genetics, physiology, ecology, and evolution.', 60, 10);

-- 5. Insert Quiz Questions (5 per quiz)

-- Quiz 1: Physics
INSERT INTO quiz_questions (id, quiz_id, question_text, option_a, option_b, option_c, option_d, correct_option, explanation) VALUES
(1, 1, 'A 10 kg object accelerates at 3 m/s² when a net force is applied. According to Newton''s Second Law, what is the net force?', '3 N', '13 N', '30 N', '0.3 N', 'C', 'Newton''s Second Law: F = ma = 10 kg × 3 m/s² = 30 N. Force equals mass multiplied by acceleration.'),

(2, 1, 'A ball of mass 2 kg is moving at 5 m/s. What is its kinetic energy?', '10 J', '25 J', '50 J', '5 J', 'B', 'Kinetic Energy = ½mv² = ½ × 2 × 5² = ½ × 2 × 25 = 25 J.'),

(3, 1, 'A wave has a frequency of 200 Hz and a wavelength of 1.5 m. What is its speed?', '133 m/s', '201.5 m/s', '300 m/s', '1.5 m/s', 'C', 'Wave speed v = f × λ = 200 Hz × 1.5 m = 300 m/s.'),

(4, 1, 'Which phenomenon demonstrated that light behaves as a particle (photon) and earned Einstein the Nobel Prize?', 'Young''s double-slit experiment', 'The Doppler Effect', 'The Photoelectric Effect', 'Coulomb''s Law', 'C', 'The Photoelectric Effect showed that light ejects electrons only if its frequency exceeds a threshold — proof that light travels in discrete photon packets with energy E = hf.'),

(5, 1, 'Two positive charges are placed 2 m apart. If the distance between them is halved to 1 m, how does the electrostatic force change?', 'It doubles', 'It stays the same', 'It becomes four times greater', 'It is halved', 'C', 'By Coulomb''s Law, F = kq₁q₂/r². Halving r means r² becomes r²/4, so F increases by a factor of 4.');

-- Quiz 2: Chemistry
INSERT INTO quiz_questions (id, quiz_id, question_text, option_a, option_b, option_c, option_d, correct_option, explanation) VALUES
(6, 2, 'Carbon-12 and Carbon-14 are isotopes. What do they have in common?', 'The same number of neutrons', 'The same mass number', 'The same number of protons (atomic number)', 'The same number of electrons and neutrons', 'C', 'Isotopes of the same element have the same atomic number (same number of protons = 6 for carbon) but different numbers of neutrons and hence different mass numbers.'),

(7, 2, 'Which type of chemical bond involves the complete transfer of electrons from one atom to another?', 'Covalent bond', 'Metallic bond', 'Ionic bond', 'Hydrogen bond', 'C', 'Ionic bonds are formed by complete transfer of electrons between atoms of very different electronegativities (usually a metal and a non-metal), producing oppositely charged ions that attract each other.'),

(8, 2, 'According to Boyle''s Law, if the pressure on a gas is doubled at constant temperature, what happens to its volume?', 'Volume doubles', 'Volume is halved', 'Volume stays the same', 'Volume quadruples', 'B', 'Boyle''s Law: P₁V₁ = P₂V₂ (at constant T). If P₂ = 2P₁, then V₂ = P₁V₁/P₂ = V₁/2. Volume is halved.'),

(9, 2, 'Le Chatelier''s Principle states that if a system at equilibrium is subjected to a stress, it will:', 'Shift to increase the stress applied', 'Reach a new equilibrium by partially counteracting the stress', 'Decompose completely to release energy', 'Stop all reaction until conditions return to normal', 'B', 'Le Chatelier''s Principle: a system at equilibrium, when disturbed, shifts in the direction that opposes the disturbance to re-establish equilibrium at a new position.'),

(10, 2, 'In an electrolytic cell, where does oxidation occur?', 'Cathode', 'Anode', 'Salt bridge', 'Both electrodes simultaneously', 'B', 'In both galvanic and electrolytic cells: oxidation occurs at the anode and reduction at the cathode. Remember: AN OX (Anode = Oxidation) and RED CAT (Reduction = Cathode).');

-- Quiz 3: Mathematics
INSERT INTO quiz_questions (id, quiz_id, question_text, option_a, option_b, option_c, option_d, correct_option, explanation) VALUES
(11, 3, 'A function f: A → B is called bijective if it is:', 'Only one-one (injective)', 'Only onto (surjective)', 'Both one-one and onto', 'Neither one-one nor onto', 'C', 'A bijective function is both injective (one-one: distinct inputs give distinct outputs) and surjective (onto: every element of the codomain has a preimage). Only bijective functions have an inverse.'),

(12, 3, 'Which of the following is correct for the identity sin²θ + cos²θ?', 'It equals 0 for all θ', 'It equals 2 for all θ', 'It equals 1 for all θ', 'It depends on the value of θ', 'C', 'sin²θ + cos²θ = 1 is the fundamental Pythagorean trigonometric identity, valid for all values of θ. It is derived directly from the Pythagorean theorem applied to the unit circle.'),

(13, 3, 'What is the derivative of f(x) = x³ + 5x² - 2x + 7?', '3x² + 5x - 2', '3x² + 10x - 2', 'x³ + 10x - 2', '3x³ + 10x - 2', 'B', 'Using the power rule d/dx(xⁿ) = nxⁿ⁻¹: d/dx(x³) = 3x², d/dx(5x²) = 10x, d/dx(-2x) = -2, d/dx(7) = 0. Therefore f''(x) = 3x² + 10x - 2.'),

(14, 3, 'Evaluate ∫(2x + 3)dx.', 'x² + 3 + C', 'x² + 3x + C', '2 + C', '2x² + 3x + C', 'B', '∫(2x + 3)dx = ∫2x dx + ∫3 dx = 2·x²/2 + 3x + C = x² + 3x + C. Always add the constant of integration C for indefinite integrals.'),

(15, 3, 'For a 2×2 matrix A = [[3, 1], [2, 4]], what is the determinant |A|?', '14', '10', '12', '5', 'B', 'For a 2×2 matrix [[a,b],[c,d]], det = ad - bc = (3)(4) - (1)(2) = 12 - 2 = 10. The determinant tells us whether the matrix is invertible (det ≠ 0).');

-- Quiz 4: Biology
INSERT INTO quiz_questions (id, quiz_id, question_text, option_a, option_b, option_c, option_d, correct_option, explanation) VALUES
(16, 4, 'Which organelle is called the "powerhouse of the cell" because it produces ATP through cellular respiration?', 'Nucleus', 'Ribosome', 'Mitochondria', 'Golgi apparatus', 'C', 'Mitochondria carry out aerobic cellular respiration, producing most of the cell''s ATP (energy currency). They have a double membrane and their own DNA, supporting the endosymbiotic theory of their origin.'),

(17, 4, 'According to Mendel''s Law of Segregation, what happens to alleles during gamete formation?', 'Both alleles enter the same gamete', 'Alleles fuse together permanently', 'Alleles separate so each gamete receives only one allele', 'Only dominant alleles are passed to gametes', 'C', 'The Law of Segregation states that each organism carries two alleles for each trait, and these alleles separate (segregate) during meiosis so that each gamete carries only one allele for each trait.'),

(18, 4, 'Which part of the human digestive system is the primary site for nutrient absorption into the bloodstream?', 'Stomach', 'Large intestine', 'Oesophagus', 'Small intestine', 'D', 'The small intestine is the primary site of digestion and nutrient absorption. Its inner lining has villi and microvilli (brush border) that massively increase surface area for efficient absorption of carbohydrates, proteins, fats, vitamins, and minerals.'),

(19, 4, 'The "10% Rule" in ecology states that when energy is transferred from one trophic level to the next:', 'All energy is transferred without loss', '10% is lost and 90% is transferred', 'Only about 10% of energy is available to the next level', 'Energy doubles at each trophic level', 'C', 'The 10% Rule (ecological efficiency) states that approximately 10% of the energy stored at one trophic level is transferred to and available for the next trophic level. The remaining ~90% is lost as heat through metabolic processes.'),

(20, 4, 'Which of the following best describes Charles Darwin''s concept of Natural Selection?', 'Organisms deliberately change to survive in their environment', 'Individuals with heritable traits better suited to the environment survive and reproduce more', 'All members of a species evolve equally over time', 'Random mutation alone drives evolution with no environmental influence', 'B', 'Natural Selection: heritable variation exists among individuals; those with traits better suited to the environment survive longer and reproduce more (differential reproductive success), passing advantageous traits to offspring. Over generations, advantageous traits become more common in the population.');

-- 6. Pre-seeded Enrollment and Progress for Demo Student
INSERT INTO enrollments (id, user_id, course_id, enrolled_at, progress_percent, status) VALUES
(1, 1, 1, NOW(), 40, 'IN_PROGRESS'),
(2, 1, 4, NOW(), 60, 'IN_PROGRESS');

-- Mark topics 1 & 2 completed for User 1 in Course 1 (Physics)
INSERT INTO lesson_completions (user_id, lesson_id, completed_at) VALUES
(1, 1, NOW()),
(1, 2, NOW()),
(1, 16, NOW()),
(1, 17, NOW()),
(1, 18, NOW());

-- Pre-seed a Quiz Submission for User 1 on Quiz 4 (Biology)
INSERT INTO quiz_submissions (user_id, quiz_id, score, total_questions, percentage, passed, submitted_at) VALUES
(1, 4, 4, 5, 80, TRUE, NOW());
