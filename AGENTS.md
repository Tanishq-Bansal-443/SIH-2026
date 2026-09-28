# AGENTS.md — TrueNorth Interactive Experience

## 1. Project Identity

This project is the interactive web experience for **TrueNorth**, an Intelligent Dead Reckoning (IDR) system designed for navigation when GNSS becomes unreliable or unavailable.

This website is a **technical product experience**, not a conventional marketing landing page, documentation site, or fake navigation-performance simulator.

The experience should let a judge understand the reasoning architecture behind TrueNorth by exploring one coherent visual system.

---

## 2. Core Product Story

TrueNorth's central philosophy is:

> **SENSE → LEARN → REMEMBER → CROSS-CHECK → NAVIGATE → REHEARSE → LEARN AGAIN**

The experience should progressively demonstrate this idea.

The website must communicate:

1. GNSS can degrade or disappear.
2. Conventional inertial dead reckoning accumulates error.
3. TrueNorth does not depend on a single source of truth.
4. It combines multiple sources of evidence.
5. Evidence is weighted according to trust, consistency, uncertainty, and context.
6. Road and vehicle behavior can become useful navigation evidence.
7. Other vehicles can provide confidence-weighted cooperative constraints.
8. FireDrill evaluates how the system would behave during GNSS outages.
9. The system can learn from observed conditions and previous experience.

---

## 3. Experience Format

Build **one immersive interactive experience with 8 chapters/scenes**, not eight unrelated pages.

### Chapter 01 — Mission
Introduce TrueNorth and the GNSS-denied problem.

### Chapter 02 — Failure
Explain GNSS degradation, outage, and why conventional DR drifts.

### Chapter 03 — TrueNorth Core
Introduce:

> SENSE → LEARN → REMEMBER → CROSS-CHECK → NAVIGATE → REHEARSE → LEARN AGAIN

### Chapter 04 — Road Intelligence
Explore:
- RoadSense
- RoadMemory
- VehicleDNA

### Chapter 05 — Trust & Fusion
Explore:
- SoftGNSS
- TrustFusion
- TopoLock

### Chapter 06 — Cooperative Navigation
Explore:
- CoNav
- confidence-weighted peer evidence
- Navigation Jury
- peer validation/rejection

### Chapter 07 — FireDrill
Explain:
- shadow navigation
- simulated GNSS outage evaluation
- reference comparison
- failure diagnosis
- blackout readiness

### Chapter 08 — System
Bring the complete architecture together and conclude with the TrueNorth identity.

---

## 4. Primary UX Principle

Every chapter should have:

> **ONE dominant visual idea + ONE meaningful interaction + ONE technical takeaway**

Do not turn chapters into collections of cards.

The user should feel that they are exploring one coherent navigation system.

The website should communicate mechanisms visually before explaining them with text.

---

## 5. Persistent Visual World

The central visual language is a **road/map environment**.

The map is not decorative.

It is the storytelling canvas.

Use the map/road geometry to transition between concepts whenever possible.

Examples:
- GNSS degradation occurs over the road.
- RoadSense events appear on the road.
- RoadMemory anchors exist spatially.
- CoNav vehicles share the same road.
- TopoLock uses road topology.
- FireDrill can reference the same navigation context.

Do not make the map look like a bright consumer navigation app.

Use subdued cartographic geometry.

---

## 6. Visual Direction

Target aesthetic:

> **Automotive engineering instrument + premium cartography + scientific visualization**

The design must NOT look like:
- generic AI SaaS
- cyberpunk
- cryptocurrency UI
- gaming HUD
- generic futuristic dashboard
- glassmorphism showcase
- neon AI interface
- conventional enterprise dashboard

Avoid:
- excessive glow
- excessive gradients
- purple/cyan AI aesthetics
- glowing borders
- giant 3D cars
- decorative holograms
- excessive rounded cards
- stock imagery
- generic AI illustrations
- meaningless animated telemetry

The engineering should be the aesthetic.

---

## 7. Locked Color System

Use a restrained, mostly neutral palette.

### Base
- Background: `#0B0D0F`
- Panel: `#151719`

### Typography
- Primary: `#E8E6E1`
- Secondary: `#A7A6A1`
- Muted: `#747570`

### Geometry
- Major/inactive geometry: `#35383A`

### TrueNorth system accent
- Steel: `#71869A`
- Highlight steel: `#8EA4B8`

### Navigation / emphasis
- Muted brass: `#B89562`

### Semantic states
- Validated: `#78947F`
- Warning / uncertainty: `#A88A58`
- Rejected / unavailable: `#9B625E`

### Color semantics
- **Steel** = active TrueNorth/system information
- **Brass** = important navigation/road emphasis
- **Green** = validated/accepted
- **Amber** = uncertain/degrading
- **Red** = rejected/unavailable
- **Gray** = inactive/background

Do not use color merely for decoration.

Do not introduce additional bright accent colors without a strong reason.

---

## 8. Typography

Use a modern, restrained sans-serif for primary text.

A technical monospace font may be used selectively for:
- measurements
- sensor labels
- system states
- technical metadata
- coordinates
- timestamps
- algorithmic values

Do not make the entire website monospace.

Typography should feel like a premium engineering product, not a terminal.

---

## 9. Navigation

Do not use a conventional marketing navbar such as:

> Home | Features | About | Contact

Use chapter navigation:

```text
01  MISSION
02  FAILURE
03  CORE
04  ROAD
05  FUSION
06  CoNAV
07  FIRE DRILL
08  SYSTEM
```

Navigation should remain subtle and should indicate the current chapter.

The experience should feel sequential but should also allow direct exploration.

---

## 10. Interaction Language

Prefer technically meaningful actions.

Examples:
- `INSPECT EVIDENCE`
- `EXAMINE PEER`
- `TRACE CONSTRAINT`
- `VIEW MEMORY`
- `EXPAND MODEL`
- `INSPECT SIGNAL`
- `FOLLOW EVIDENCE`

Avoid generic marketing actions such as:
- Learn More
- Discover More
- AI Magic
- See the Future
- Experience Intelligence

Interaction should reveal technical reasoning.

---

## 11. Core Technical Concepts

The following terminology is locked.

### SoftGNSS
GNSS is treated as a continuously weighted measurement rather than a binary available/unavailable signal.

Quality indicators can include:
- position accuracy
- satellite count
- C/N0
- innovation/consistency

Do not imply raw pseudorange/Doppler tight coupling unless it is actually implemented.

### RoadSense
Extract recurring road/motion signatures such as:
- curves
- intersections
- stops
- speed-breaker-like impulses
- roughness
- road transitions
- other recurring motion signatures

RoadSense observations are probabilistic evidence, not exact ground truth.

### RoadMemory
Persist high-confidence RoadSense observations and match them when re-observed.

RoadMemory creates additional localization constraints.

Do not portray it as a giant prebuilt fingerprint database.

### VehicleDNA
A learned vehicle-specific response profile covering relevant:
- acceleration
- braking
- yaw
- vibration
- mounting/vehicle response

VehicleDNA helps distinguish vehicle-induced motion from road-induced motion.

Do not turn VehicleDNA into a separate oversized AI product.

### TrustFusion
Central evidence-weighting/fusion concept.

No source gets absolute authority.

Potential evidence:
- GNSS
- IMU
- AI speed
- RoadSense/RoadMemory
- map/topology
- NHC/kinematic constraints
- magnetometer
- barometer
- peer constraints

### TopoLock
Supporting mechanism combining road topology and vehicle kinematics to reject impossible trajectories.

Do not present basic map matching or NHC as the project's primary novelty.

### CoNav
Nearby vehicles are treated as confidence-weighted navigation witnesses.

Peer evidence can include:
- position or road segment/chainage
- velocity
- heading
- uncertainty
- timestamp
- GNSS trust

Peer validation should consider:
- same road
- direction
- freshness
- kinematic consistency
- uncertainty
- topology

Never describe CoNav as blindly sharing GPS coordinates.

### FireDrill
A shadow/evaluation subsystem that evaluates navigation behavior under simulated GNSS outages while GNSS can remain available as a reference.

FireDrill does not control normal navigation.

Do not invent benchmark results or readiness scores.

---

## 12. Simulation Rules

The website may use local interaction state and illustrative visual behavior.

It must NOT fabricate real navigation performance.

Never invent:
- position accuracy
- drift values
- readiness scores
- measured latency
- benchmark percentages
- ML accuracy
- sensor performance

If a value is illustrative, explicitly label it as:
- `ILLUSTRATIVE`
- `CONCEPTUAL`
- `SIMULATED`

Prefer qualitative system-state changes over fake numerical telemetry.

The website is an explanatory experience, not the source of truth for measured prototype performance.

---

## 13. Technical Architecture of the Frontend

Use a maintainable component architecture.

Suggested structure:

```text
src/
  components/
    shell/
    navigation/
    map/
    typography/
    technical/
    evidence/
    diagrams/
    transitions/

  scenes/
    Mission/
    Failure/
    Core/
    RoadIntelligence/
    Fusion/
    CoNav/
    FireDrill/
    System/

  data/
    road/
    system/
    peers/
    architecture/

  state/
    experience/
    interactions/

  styles/
```

The exact framework/file structure may differ if the existing project already establishes a better architecture.

Do not rewrite an existing working architecture merely to match this example.

---

## 14. State Management

The experience should have a coherent global state for:
- current chapter
- selected evidence source
- selected road event
- selected peer
- current interaction state
- transition state
- expanded technical explanation

Keep presentation state separate from domain/data definitions.

Use deterministic local data for the experience.

Do not introduce random values for visual telemetry.

---

## 15. Reusability

Create reusable primitives for:
- chapter transitions
- technical labels
- evidence nodes
- connection lines
- map annotations
- state indicators
- inspection panels
- diagrams
- tooltips
- chapter navigation
- buttons/actions
- measurement displays

Do not duplicate the same UI logic across chapters.

---

## 16. Animation

Animation should explain relationships.

Good uses:
- evidence flowing into TrustFusion
- road event appearing
- RoadMemory matching
- peer validation
- GNSS signal degrading
- chapter transitions
- architecture nodes connecting
- map zoom/pan transitions

Bad uses:
- constant floating elements
- meaningless particle effects
- excessive parallax
- perpetual glowing
- decorative 3D animations
- animation that makes information harder to read

Respect `prefers-reduced-motion`.

Every important interaction must remain understandable without animation.

---

## 17. Performance

Prioritize:
1. fast initial render
2. smooth scrolling
3. stable layout
4. efficient SVG/canvas usage
5. limited animation workload
6. responsive behavior
7. no unnecessary dependencies

Do not add heavy 3D libraries unless they materially improve the experience.

The experience should remain lightweight enough to run reliably on a judge's laptop.

---

## 18. Responsive Design

The experience must work on:
- desktop
- laptop
- tablet
- mobile

Desktop is the primary design target because the SIH demo will likely be recorded/displayed on a larger screen.

Do not create desktop-only layouts that break at smaller widths.

Reflow technical panels and diagrams rather than allowing clipping or horizontal page overflow.

---

## 19. Accessibility

Maintain:
- readable contrast
- keyboard navigation
- visible focus states
- semantic buttons/links
- accessible labels
- reduced-motion support
- meaningful text alternatives where appropriate

Do not make hover the only way to access information.

---

## 20. Content Accuracy

Never invent technical claims.

Use the established TrueNorth terminology and architecture.

Distinguish between:
- implemented functionality
- conceptual functionality
- stretch functionality
- future work

Do not claim:
- lane-level accuracy without measurement
- tight GNSS coupling without raw satellite measurements
- exact road-event localization without evidence
- actual cooperative V2X infrastructure if only conceptual
- benchmark performance unless measured

---

## 21. SIH Presentation Context

The experience is being created to support an SIH 2026 submission/demo.

Optimize for:
- immediate understanding
- technical differentiation
- visual credibility
- clear architecture
- memorable innovation
- short demo-video readability

A judge should understand the core idea within the first minute without reading large blocks of text.

---

## 22. Demo Video Target

The full website should be explorable without a time limit.

The recorded walkthrough should target approximately **3–4 minutes**.

Intended narrative:

```text
Problem
  ↓
GNSS failure
  ↓
Why conventional DR struggles
  ↓
TrueNorth's evidence-based approach
  ↓
Road intelligence
  ↓
Trust fusion
  ↓
CoNav
  ↓
FireDrill
  ↓
Complete system
```

Do not optimize the entire website around the video duration. The website should remain richer than the recorded walkthrough.

---

## 23. Development Rules

### Before every phase
1. Inspect the existing implementation.
2. Understand the current component architecture.
3. Reuse existing components where appropriate.
4. Do not rewrite completed work without a concrete reason.
5. Preserve existing behavior.
6. Identify dependencies before adding new ones.

### During implementation
- Keep components focused.
- Avoid giant monolithic components.
- Avoid duplicated state.
- Avoid hardcoded content inside deeply nested components.
- Keep data separate from presentation where practical.
- Keep interactions deterministic.
- Test each interaction immediately.

### After implementation
Verify:
- desktop layout
- mobile layout
- navigation
- keyboard interaction
- reduced motion
- console errors
- broken imports
- broken routes
- animation cleanup
- no accidental redesign of earlier chapters

---

## 24. Non-Negotiable Design Constraints

1. **Do not turn this into a generic SaaS landing page.**
2. **Do not use a cyberpunk/AI aesthetic.**
3. **Do not fabricate navigation performance.**
4. **Do not use excessive cards.**
5. **Do not add decorative features that do not explain the system.**
6. **Do not invent technical claims.**
7. **Do not rewrite previous phases unnecessarily.**
8. **Do not use random telemetry.**
9. **Do not use bright neon colors.**
10. **Do not let animation overpower information.**
11. **Do not make the map a decorative background only.**
12. **Do not present every technical component as an independent innovation.**
13. **Do not describe CoNav as blind coordinate sharing.**
14. **Do not treat RoadMemory as ground truth.**
15. **Do not treat FireDrill as a navigation sensor.**
16. **Do not claim a capability merely because the UI visualizes it.**

---

## 25. Innovation Hierarchy

The visual experience should distinguish headline innovations from supporting mechanisms.

### Headline innovations
- SoftGNSS
- RoadSense
- VehicleDNA
- FireDrill
- CoNav

### Supporting intelligence/mechanisms
- RoadMemory
- TrustFusion
- TopoLock
- adaptive fusion
- NHC/kinematic constraints
- map matching

Do not give every item equal visual weight.

---

## 26. Final Quality Bar

The finished experience should make the viewer think:

> "I am exploring a navigation system."

Not:

> "I am looking at a website about a navigation system."

The visual system, interaction design, transitions, diagrams, map, and technical explanations should all serve that goal.

Before declaring a phase complete, verify that it strengthens the overall TrueNorth experience rather than merely adding more content.
