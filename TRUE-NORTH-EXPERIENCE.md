# TRUE-NORTH EXPERIENCE

## Interactive Technical Experience --- Master Product & Implementation Blueprint

**Project:** TrueNorth --- AI-assisted smartphone-based Intelligent Dead
Reckoning\
**Context:** Smart India Hackathon 2026\
**Document role:** Master blueprint for the interactive web experience\
**Status:** Design and implementation source of truth

------------------------------------------------------------------------

# 0. DOCUMENT PURPOSE

This document defines **what the TrueNorth interactive experience should
be**.

It is intentionally separate from `AGENTS.md`.

-   `AGENTS.md` defines global rules, constraints, engineering
    principles, visual constraints, and non-negotiables.
-   `TRUE-NORTH-EXPERIENCE.md` defines the actual experience: its
    chapters, composition, interactions, copy, transitions, components,
    states, and implementation intent.
-   Phase prompts define what the implementation agent should build at a
    particular point in the project.

An implementation agent must read **both** files before implementing any
phase.

The experience is not a conventional marketing website, generic SaaS
dashboard, fake navigation simulator, or collection of unrelated feature
pages.

It is:

> **One immersive interactive technical experience in which the user
> explores how TrueNorth continues to reason about motion and position
> when GNSS becomes unreliable or disappears.**

The persistent visual world is a subdued map / road environment. The
interface behaves like an engineering instrument layered over that
world.

------------------------------------------------------------------------

# 1. PRODUCT OBJECTIVE

## 1.1 Primary objective

Communicate the TrueNorth system clearly enough that a technically
sophisticated reviewer can understand:

1.  why conventional GNSS is insufficient in degraded environments;
2.  why pure inertial dead reckoning accumulates error;
3.  how TrueNorth extracts useful information from smartphone sensors;
4.  how AI contributes specific learned estimates rather than being used
    as a vague buzzword;
5.  how road characteristics become navigation evidence;
6.  how previously observed road evidence is remembered;
7.  how GNSS quality is continuously assessed rather than treated as
    simply available/unavailable;
8.  how multiple evidence sources are fused according to trust;
9.  how map topology and vehicle constraints reject impossible
    trajectories;
10. how nearby vehicles can act as confidence-weighted navigation
    witnesses;
11. how FireDrill evaluates navigation readiness without controlling
    normal navigation;
12. how the system can learn from repeated experience.

## 1.2 Secondary objective

Create a memorable visual identity around one idea:

> **When the sky becomes unreliable, TrueNorth does not stop reasoning.
> It cross-checks evidence.**

## 1.3 What the site must NOT imply

The site must not imply that the prototype has achieved performance that
has not actually been measured.

Do not invent:

-   navigation accuracy;
-   drift percentages;
-   ML accuracy;
-   sensor update rates not actually measured;
-   latency;
-   readiness scores;
-   blackout survival times;
-   lane-level positioning;
-   production deployment;
-   validated clinical/industrial performance;
-   real-time fleet scale.

If an illustrative value is necessary for an interaction, label it:

-   `ILLUSTRATIVE`
-   `CONCEPTUAL`
-   `SIMULATED`

Prefer qualitative system states over fabricated numerical performance.

------------------------------------------------------------------------

# 2. CORE STORY

The complete experience follows this conceptual loop:

> **SENSE → LEARN → REMEMBER → CROSS-CHECK → NAVIGATE → REHEARSE → LEARN
> AGAIN**

This loop is the conceptual spine of the entire site.

## 2.1 Sense

TrueNorth receives:

-   accelerometer;
-   gyroscope;
-   magnetometer / compass;
-   GNSS;
-   optional external IMU;
-   contextual motion signals.

## 2.2 Learn

AI extracts useful motion information such as:

-   forward-speed estimates;
-   motion state;
-   maneuver state;
-   vehicle-specific response characteristics;
-   road-event signatures;
-   sensor-quality context.

## 2.3 Remember

TrueNorth maintains compact, confidence-aware memory:

-   RoadSense observations;
-   Road DNA;
-   RoadMemory;
-   Vehicle DNA;
-   prior FireDrill behaviour.

## 2.4 Cross-check

Evidence is evaluated against other evidence:

-   SoftGNSS;
-   TrustFusion;
-   map topology;
-   vehicle kinematic constraints;
-   non-holonomic constraints;
-   road memory;
-   peer vehicles;
-   sensor health.

## 2.5 Navigate

The fusion core produces a continuous navigation state:

-   position;
-   velocity;
-   orientation;
-   sensor biases;
-   uncertainty.

## 2.6 Rehearse

FireDrill runs shadow navigation to evaluate:

-   expected blackout behaviour;
-   heading quality;
-   speed quality;
-   position consistency;
-   known weaknesses;
-   current readiness.

## 2.7 Learn again

The resulting evidence changes future trust and expectations.

The system is therefore presented as an **adaptive evidence system**,
not merely an IMU tracker.

------------------------------------------------------------------------

# 3. EXPERIENCE STRUCTURE

The experience contains eight chapters.

  Chapter   Name         Primary question
  --------- ------------ -----------------------------------------------------
  01        MISSION      Why does TrueNorth need to exist?
  02        FAILURE      What happens when GNSS becomes unreliable?
  03        CORE         How does TrueNorth reason differently?
  04        ROAD         How does the road become a source of information?
  05        FUSION       How does the system decide what to trust?
  06        CoNAV        How can nearby vehicles become additional evidence?
  07        FIRE DRILL   How does TrueNorth test its own readiness?
  08        SYSTEM       How does everything fit together?

Each chapter must contain:

1.  **one dominant visual idea;**
2.  **one meaningful interaction;**
3.  **one technical takeaway.**

Do not fill chapters with multiple competing widgets.

------------------------------------------------------------------------

# 4. GLOBAL EXPERIENCE MODEL

## 4.1 Persistent visual canvas

The map / road environment persists conceptually across chapters.

It should feel like:

-   premium cartography;
-   engineering drawing;
-   navigation instrumentation;
-   scientific visualization.

The road network is not decorative.

It is the environment in which:

-   GNSS quality changes;
-   vehicles move;
-   road events occur;
-   topology matters;
-   memory is attached;
-   peers are evaluated;
-   blackout regions appear.

## 4.2 Global scene layers

Use a consistent scene hierarchy:

``` text
GLOBAL EXPERIENCE
│
├── BACKGROUND
│   └── subdued map / terrain / road geometry
│
├── SYSTEM LAYER
│   ├── navigation state
│   ├── chapter marker
│   └── contextual metadata
│
├── EVIDENCE LAYER
│   ├── GNSS
│   ├── IMU
│   ├── road events
│   ├── memory
│   └── peers
│
├── INTERACTION LAYER
│   ├── inspect
│   ├── trace
│   ├── expand
│   └── follow
│
└── NARRATIVE LAYER
    ├── chapter title
    ├── explanatory copy
    └── technical takeaway
```

## 4.3 Global navigation

Do not use:

`Home | Features | About | Contact`

Use chapter navigation:

``` text
01 MISSION
02 FAILURE
03 CORE
04 ROAD
05 FUSION
06 CoNAV
07 FIRE DRILL
08 SYSTEM
```

Navigation may appear as:

-   a restrained left rail;
-   a compact chapter index;
-   a progress indicator;
-   a collapsible chapter navigator on mobile.

The navigation must remain secondary to the story.

------------------------------------------------------------------------

# 5. VISUAL SYSTEM

## 5.1 Locked palette

Use the palette defined in `AGENTS.md`.

``` text
BACKGROUND          #0B0D0F
PANEL               #151719
PRIMARY TEXT        #E8E6E1
SECONDARY TEXT      #A7A6A1
MUTED TEXT          #747570
MAJOR GEOMETRY      #35383A
TRUE NORTH STEEL    #71869A
HIGHLIGHT STEEL     #8EA4B8
NAVIGATION BRASS    #B89562
VALIDATED           #78947F
WARNING             #A88A58
REJECTED            #9B625E
```

## 5.2 Semantic use

-   **Steel:** active TrueNorth/system information.
-   **Brass:** navigation and important road emphasis.
-   **Green:** validated / accepted evidence.
-   **Amber:** uncertain / degrading evidence.
-   **Red:** rejected / unavailable.
-   **Gray:** inactive/background geometry.

Never use colour merely for decoration.

## 5.3 Typography

Primary interface text:

-   restrained modern sans-serif.

Technical metadata:

-   monospace.

Do not render the entire site as a terminal.

Use monospace for:

-   sensor names;
-   state labels;
-   timestamps;
-   uncertainty values;
-   IDs;
-   technical metadata.

------------------------------------------------------------------------

# 6. INTERACTION LANGUAGE

Use interaction labels that describe the user's action.

Preferred:

-   `INSPECT EVIDENCE`
-   `TRACE CONSTRAINT`
-   `VIEW MEMORY`
-   `EXAMINE PEER`
-   `INSPECT SIGNAL`
-   `EXPAND MODEL`
-   `FOLLOW EVIDENCE`
-   `VIEW ARCHITECTURE`

Avoid generic:

-   `LEARN MORE`
-   `CLICK HERE`
-   `EXPLORE`
-   `GET STARTED`

Interactions should expose relationships, not merely open modal boxes.

------------------------------------------------------------------------

# 7. CHAPTER 01 --- MISSION

## 7.1 Narrative purpose

Introduce the navigation problem without immediately explaining every
component.

The user should understand:

> GNSS is useful, but not continuously reliable.

## 7.2 Dominant visual

A quiet road scene with a vehicle moving through progressively difficult
environments.

Suggested spatial progression:

``` text
OPEN ROAD
     ↓
URBAN CANYON
     ↓
UNDERPASS / TUNNEL
     ↓
GNSS DEGRADATION
```

The map remains understated.

The vehicle is small and instrument-like, not a giant 3D asset.

## 7.3 Opening composition

Large restrained title:

> **TRUENORTH**

Subtitle:

> **Intelligent Dead Reckoning for GNSS-Degraded Environments**

Supporting statement:

> When the sky becomes unreliable, navigation has to reason from
> everything else it can observe.

Do not use a giant marketing slogan occupying the entire viewport.

## 7.4 Interaction

`FOLLOW THE VEHICLE`

On activation:

-   camera follows the route;
-   environment changes gradually;
-   GNSS indicator moves from healthy toward degraded;
-   chapter explanation updates.

This is a conceptual animation, not a performance simulation.

## 7.5 Technical takeaway

Display a compact statement:

``` text
GNSS is an input.
It is not an absolute authority.
```

## 7.6 Transition

As the vehicle approaches a degraded region, transition into Chapter 02.

Do not use a hard page reload.

------------------------------------------------------------------------

# 8. CHAPTER 02 --- FAILURE

## 8.1 Narrative purpose

Show the failure mode clearly.

The user must understand the difference between:

1.  GNSS becoming less trustworthy;
2.  GNSS disappearing;
3.  dead reckoning accumulating uncertainty.

## 8.2 Dominant visual

The same road environment becomes an evidence timeline.

Show:

``` text
GNSS QUALITY
██████████████████
██████████████
██████████
████
—
```

Use semantic states, not fake numerical precision.

Labels:

``` text
HEALTHY
DEGRADING
UNRELIABLE
UNAVAILABLE
```

## 8.3 Conventional DR visual

Show an inertial trajectory gradually diverging.

Important:

This is **conceptual**, not measured.

Label the visualization:

`CONCEPTUAL DRIFT VISUALIZATION`

Do not display invented meter values.

## 8.4 Interaction

`INSPECT SIGNAL`

When activated, expose evidence such as:

-   satellite availability;
-   GNSS quality;
-   consistency;
-   IMU availability;
-   inertial uncertainty.

If numerical values are shown, make clear that they are illustrative.

## 8.5 Key visual comparison

Show two conceptual paths:

``` text
GNSS ONLY
     ↓
signal weakens
     ↓
position confidence falls


PURE DEAD RECKONING
     ↓
GNSS disappears
     ↓
error accumulates
```

Then introduce:

``` text
TRUE NORTH
     ↓
cross-check multiple evidence sources
```

## 8.6 Technical takeaway

> The problem is not simply "GNSS OFF."

> The problem is knowing **how much to trust each source at each
> moment**.

This sets up SoftGNSS and TrustFusion.

------------------------------------------------------------------------

# 9. CHAPTER 03 --- CORE

## 9.1 Narrative purpose

Reveal the central architecture.

The chapter should feel like the system's reasoning engine becoming
visible.

## 9.2 Dominant visual

The six-stage loop appears around the moving vehicle:

``` text
SENSE
  ↓
LEARN
  ↓
REMEMBER
  ↓
CROSS-CHECK
  ↓
NAVIGATE
  ↓
REHEARSE
  ↺
```

Then:

`LEARN AGAIN`

appears as the loop closes.

## 9.3 Interaction

`FOLLOW EVIDENCE`

The user selects a stage.

The corresponding evidence stream becomes active.

Example:

Selecting `LEARN` highlights:

-   IMU window;
-   motion state;
-   AI speed estimate;
-   VehicleDNA features.

Selecting `CROSS-CHECK` highlights:

-   GNSS trust;
-   road evidence;
-   topology;
-   peer evidence.

## 9.4 Avoid

Do not make every node a glowing futuristic orb.

Use:

-   lines;
-   restrained nodes;
-   labels;
-   small state indicators;
-   subtle motion.

The visual language should resemble an engineering schematic.

## 9.5 Core explanatory panel

The panel changes according to selected stage.

### SENSE

``` text
RAW SIGNALS

Accelerometer
Gyroscope
Magnetometer
GNSS
Optional external IMU
```

### LEARN

``` text
LEARNED SIGNALS

Motion state
Forward speed
Maneuver state
Vehicle response
Road signatures
```

### REMEMBER

``` text
MEMORY

Road DNA
RoadMemory
Vehicle DNA
Past FireDrill behaviour
```

### CROSS-CHECK

``` text
EVIDENCE

SoftGNSS
TrustFusion
TopoLock
NHC / vehicle constraints
CoNav
```

### NAVIGATE

``` text
STATE

Position
Velocity
Orientation
Bias
Uncertainty
```

### REHEARSE

``` text
FIRE DRILL

Shadow navigation
Blackout evaluation
Weakness discovery
Readiness adaptation
```

## 9.6 Technical takeaway

> TrueNorth is not one model.

> It is an evidence loop.

------------------------------------------------------------------------

# 10. CHAPTER 04 --- ROAD INTELLIGENCE

## 10.1 Narrative purpose

Introduce the most visually distinctive concept:

> **The road itself becomes a navigation signal.**

## 10.2 Dominant visual

A road segment contains several subtle physical events.

Examples:

-   curve;
-   intersection;
-   stop;
-   speed-breaker-like impulse;
-   expansion-joint-like event;
-   roughness transition;
-   road-surface transition.

The user can inspect an event.

## 10.3 RoadSense

Show a road event being detected from an IMU waveform.

Composition:

``` text
ROAD EVENT
     │
     ▼
IMU SIGNATURE
     │
     ▼
ROADSENSE
     │
     ▼
PROBABILISTIC OBSERVATION
```

Do not claim exact object identification unless empirically validated.

Prefer:

-   `ROAD EVENT LIKELY`
-   `CURVE SIGNATURE`
-   `ROUGHNESS TRANSITION`
-   `STOP EVENT`
-   `RECURRING IMPULSE`

## 10.4 Interaction

`INSPECT ROAD EVENT`

On interaction:

-   waveform appears;
-   corresponding road location highlights;
-   event confidence appears qualitatively;
-   related memory appears if available.

## 10.5 RoadMemory

Show:

``` text
OBSERVED
   ↓
STORED
   ↓
RE-OBSERVED
   ↓
MATCH STRENGTHENS
```

Memory should be shown as compact evidence markers attached to road
locations.

Do not build the visual as a giant database of every road.

## 10.6 Road DNA

Road DNA is a compact representation of recurring characteristics.

Example conceptual panel:

``` text
ROAD DNA

Curve pattern
Surface vibration
Stop frequency
Expansion-joint signature
GNSS degradation context
```

Do not present this as a literal universally fixed schema if
implementation details are still provisional.

## 10.7 Vehicle DNA

Show two vehicles experiencing the same road.

Their sensor traces differ.

Concept:

``` text
SAME ROAD
     │
     ├── VEHICLE A
     │      soft suspension
     │      response profile A
     │
     └── VEHICLE B
            stiff suspension
            response profile B
```

The system learns the vehicle-specific response rather than treating all
IMU signals identically.

## 10.8 Technical takeaway

> The road is not only where the vehicle is.

> The road leaves repeatable signatures in the sensors.

------------------------------------------------------------------------

# 11. CHAPTER 05 --- TRUST & FUSION

## 11.1 Narrative purpose

Explain the central decision mechanism.

This is the chapter where the experience should make it obvious that
TrueNorth is not simply averaging sensor outputs.

## 11.2 Dominant visual

A **TrustFusion evidence table / flow diagram**.

Sources enter from different directions:

``` text
GNSS ───────────────┐
AI SPEED ───────────┤
IMU ────────────────┤
NHC ────────────────┤
MAGNETOMETER ───────┤
ROAD MEMORY ────────┤──► TRUST FUSION ──► NAVIGATION STATE
TOPOLOGY ───────────┤
CoNav ──────────────┤
ZUPT ───────────────┘
```

## 11.3 SoftGNSS

SoftGNSS must receive major emphasis.

Core statement:

> **Replace binary GNSS availability with continuous measurement
> trust.**

Show a continuum:

``` text
HIGH TRUST ─────────────── LOW TRUST
███████████████████░░░░░░
```

The visual should communicate that GNSS can remain partially useful
while degraded.

## 11.4 Interaction

`INSPECT SIGNAL`

The user selects GNSS.

Reveal conceptually:

``` text
GNSS EVIDENCE

Accuracy
Satellite count
C/N0
Innovation consistency
Measurement history

        ↓

ADAPT MEASUREMENT TRUST
```

If implementation does not actually use a given metric, do not imply
that it does.

## 11.5 TrustFusion

The central fusion node should visibly respond when evidence changes.

Example conceptual interaction:

-   GNSS becomes inconsistent;
-   GNSS evidence moves toward amber;
-   road/topology/AI speed constraints become relatively more important;
-   navigation state remains continuous.

Do not display fabricated covariance numbers.

## 11.6 TopoLock

Show a candidate path that violates road topology.

Example:

``` text
CANDIDATE TRAJECTORY
       X
       │
       │ impossible turn
       │
ROAD ──┴────────────
```

Then:

``` text
TOPOLOGY + NHC
       ↓
TRAJECTORY REJECTED
```

## 11.7 Map matching

Map matching should be represented as a constraint, not magical
snapping.

Use:

> Candidate trajectory → map compatibility → constrained state.

## 11.8 Technical takeaway

> Every source contributes evidence.

> Trust determines how much influence that evidence receives.

------------------------------------------------------------------------

# 12. CHAPTER 06 --- CoNAV

## 12.1 Narrative purpose

Introduce cooperative navigation without making it look like simple GPS
sharing.

Core statement:

> **When one vehicle loses the sky, it can borrow information from
> vehicles that still have it.**

## 12.2 Dominant visual

A road / tunnel with several vehicles:

``` text
TUNNEL

A     B       C       D
●─────●───────●───────●

GNSS ✓   ✓      ?       ✕
```

Vehicle D is the vehicle being navigated.

## 12.3 Important conceptual rule

Do not show:

> "Vehicle A tells Vehicle D where it is."

Show:

> "Vehicle A provides a confidence-weighted navigation witness."

## 12.4 Peer packet

Interaction:

`EXAMINE PEER`

Display:

``` text
PEER STATE

Position
Velocity
Heading
Road segment
Uncertainty
GNSS trust
Timestamp
Sensor health
```

## 12.5 Peer validation

The receiving vehicle checks:

-   spatial compatibility;
-   road segment compatibility;
-   topology;
-   heading;
-   velocity;
-   altitude / vertical context;
-   timestamp freshness;
-   peer uncertainty;
-   communication quality.

Visual flow:

``` text
PEER EVIDENCE
      ↓
CONSISTENCY CHECKS
      ↓
TRUST WEIGHT
      ↓
FUSION
```

## 12.6 Flyover / stacked-road case

Include a subtle interaction showing:

``` text
FLYOVER
────────────── A


ROAD BELOW
────────────── B
```

A and B may be geographically close but topologically incompatible.

Show:

> `PEER REJECTED — ROAD TOPOLOGY MISMATCH`

This is an important demonstration because it shows that proximity alone
is insufficient.

## 12.7 Multi-hop concept

Optional stretch interaction:

``` text
A → B → C → D
```

Show confidence / uncertainty becoming weaker across hops.

Do not invent precise numbers.

Use qualitative labels:

``` text
DIRECT
1 HOP
2 HOPS
STALE
```

and visually reduce authority.

## 12.8 Collective Road Memory

Optional stretch:

One vehicle detects a road fingerprint.

Another vehicle later observes it.

Show:

``` text
VEHICLE A
Road fingerprint detected
        ↓
COLLECTIVE MEMORY
        ↓
VEHICLE B
Fingerprint matched
```

This must remain conceptual unless implemented.

## 12.9 Privacy

If privacy is mentioned:

-   ephemeral peer identity;
-   minimal navigation state;
-   local-first processing;
-   no unnecessary permanent vehicle identity.

Do not imply a finalized privacy architecture unless implemented.

## 12.10 Technical takeaway

> CoNav is not coordinate sharing.

> It is confidence-weighted cooperative evidence.

------------------------------------------------------------------------

# 13. CHAPTER 07 --- FIRE DRILL

## 13.1 Narrative purpose

Explain how TrueNorth evaluates itself before a real blackout.

Core statement:

> **Dead reckoning estimates where I am. FireDrill estimates how much I
> should trust that estimate.**

## 13.2 Dominant visual

A live navigation path and a shadow navigation path run in parallel.

``` text
REAL NAVIGATION
────────────────────────►

FIRE DRILL
───────────────►
       shadow
       evaluation
```

The FireDrill state must never control normal navigation.

## 13.3 Shadow-mode architecture

Show:

``` text
REAL GNSS
    │
    ├────────► REFERENCE / EVALUATION
    │
    └──X────► FIRE DRILL NAVIGATION

FIRE DRILL
    │
    ▼
SELF-EVALUATION
    │
    ├── Heading
    ├── Speed
    └── Position consistency
            │
            ▼
       TRUST / READINESS
```

The key idea is that GNSS can remain available as an evaluation
reference while being hidden from the shadow navigation engine.

## 13.4 Interaction

`RUN BLACKOUT REHEARSAL`

The interaction should:

1.  start a conceptual shadow run;
2.  visually hide GNSS from the shadow navigation path;
3.  continue showing GNSS separately as evaluation/reference;
4.  reveal qualitative consistency;
5.  expose a weakness if one exists.

Do not fabricate measured drift.

## 13.5 Weakness discovery

Example conceptual state:

``` text
KNOWN WEAKNESS

Rapid turns
     ↓
heading uncertainty increases
     ↓
increase caution
     ↓
rely more on road / map constraints
```

This is a system-behaviour concept, not a measured claim.

## 13.6 Road + FireDrill

Show that past rehearsals can be associated with road context:

``` text
FIRE DRILL
    ↓
OBSERVED BEHAVIOUR
    ↓
ROAD MEMORY
    ↓
FUTURE BLACKOUT
    ↓
BETTER EXPECTATION
```

## 13.7 Vehicle + FireDrill

Show:

``` text
Vehicle DNA
     +
Road DNA
     +
Current sensor state
     ↓
Expected behaviour
```

## 13.8 Readiness

Use qualitative states:

-   `READY`
-   `CAUTION`
-   `DEGRADED`
-   `INSUFFICIENT EVIDENCE`

Avoid invented scores.

If a numeric readiness score is ever shown in implementation, it must be
explicitly labelled illustrative unless it is a real measured system
output.

## 13.9 Technical takeaway

> FireDrill does not navigate the vehicle.

> It measures the reliability of navigation.

------------------------------------------------------------------------

# 14. CHAPTER 08 --- SYSTEM

## 14.1 Narrative purpose

Bring the complete architecture together.

This is the technical payoff.

## 14.2 Dominant visual

Full architecture diagram, but presented as an explorable system rather
than a static poster.

Suggested structure:

``` text
                    ┌──────────────────────┐
                    │   RAW SENSOR STREAM  │
                    └──────────┬───────────┘
                               ▼
                    ALIGNMENT / TRANSFORM
                               ▼
                    STATIONARY / BIAS
                               ▼
                 MOTION / VEHICLE UNDERSTANDING
                               ▼
                       AI SPEED ESTIMATOR
                               │
                    ┌──────────┴──────────┐
                    ▼                     ▼
                SOFT GNSS             ROAD SENSE
                    │                     │
                    └──────────┬──────────┘
                               ▼
                    ADAPTIVE TRUST FUSION
                               │
              ┌────────────────┼────────────────┐
              ▼                ▼                ▼
          ROAD MEMORY       TOPOLOCK          CoNav
              │                │                │
              └────────────────┼────────────────┘
                               ▼
                       NAVIGATION STATE
                               │
                               ▼
                         FIRE DRILL
                               │
                               ▼
                         LEARN AGAIN
```

The exact architecture should remain consistent with the implementation.

## 14.3 Interaction

`VIEW ARCHITECTURE`

Clicking a subsystem:

-   highlights its upstream inputs;
-   highlights downstream effects;
-   opens a compact technical explanation;
-   does not navigate away from the experience.

## 14.4 Innovation hierarchy

The system overview should visually distinguish major ideas from
supporting mechanisms.

### Major innovations

-   SoftGNSS;
-   RoadSense;
-   RoadMemory;
-   VehicleDNA;
-   TrustFusion;
-   CoNav;
-   FireDrill.

### Supporting mechanisms

-   alignment;
-   bias estimation;
-   ZUPT / ZARU;
-   AI speed estimation;
-   NHC;
-   adaptive EKF;
-   map matching;
-   TopoLock;
-   sensor gating.

Do not visually suggest that every block is an equally novel invention.

## 14.5 Final statement

End with:

> **TrueNorth does not wait for one perfect sensor.**

Then:

> **It builds a navigation decision from evidence.**

Keep the ending restrained.

No oversized "THE FUTURE OF NAVIGATION" statement.

------------------------------------------------------------------------

# 15. GLOBAL TRANSITIONS

Transitions must communicate state changes.

## 15.1 Chapter transition

Use:

-   map camera movement;
-   route continuation;
-   evidence layer change;
-   chapter marker update.

Avoid:

-   flashy wipes;
-   page-turn animations;
-   excessive blur;
-   cinematic particle effects.

## 15.2 Failure transition

When moving from Mission to Failure:

``` text
GNSS HEALTHY
     ↓
GNSS DEGRADING
     ↓
GNSS UNAVAILABLE
```

The same road remains visible so the user understands that the
environment has not changed --- the evidence has.

## 15.3 Road transition

Move camera closer to the road surface / event.

## 15.4 Fusion transition

Pull camera slightly upward and expose evidence relationships.

## 15.5 CoNav transition

Widen the scene to reveal additional vehicles.

## 15.6 FireDrill transition

Duplicate the route visually:

-   real path;
-   shadow path.

## 15.7 System transition

Pull back into architecture view.

------------------------------------------------------------------------

# 16. MAP SYSTEM

## 16.1 Purpose

The map is a narrative instrument.

It must support:

-   road topology;
-   vehicle positions;
-   route;
-   road events;
-   memory markers;
-   GNSS degradation;
-   peer relationships.

## 16.2 Visual treatment

Use:

-   subdued roads;
-   low-contrast terrain;
-   restrained labels;
-   sparse points of interest;
-   engineering-like linework.

Avoid a visually busy consumer navigation map.

## 16.3 Map states

The map should support at least:

``` text
DEFAULT
GNSS DEGRADED
GNSS UNAVAILABLE
ROAD EVENT
MEMORY MATCH
PEER EVIDENCE
TOPOLOGY REJECTION
FIRE DRILL
SYSTEM OVERVIEW
```

## 16.4 No fake map claims

Do not imply that every visible road/event is live data.

If a scene is illustrative, state that in metadata where appropriate.

------------------------------------------------------------------------

# 17. COMPONENT ARCHITECTURE

The implementation should use reusable components rather than eight
independent page implementations.

Suggested component groups:

``` text
experience/
├── ExperienceShell
├── ChapterNavigator
├── ChapterFrame
├── SceneCanvas
├── MapScene
├── VehicleMarker
├── EvidenceLayer
├── EvidencePanel
├── TechnicalPanel
├── ChapterHeader
├── ChapterFooter
├── SystemState
├── SignalIndicator
├── TrustIndicator
├── MemoryMarker
├── RoadEventMarker
├── PeerVehicle
├── ConstraintTrace
├── ArchitectureGraph
├── Waveform
├── Timeline
├── Modal / Drawer
└── ResponsiveControls
```

Components must be composable.

Do not create duplicate versions of the same panel for each chapter.

------------------------------------------------------------------------

# 18. STATE ARCHITECTURE

Use a central experience state model.

Conceptual structure:

``` ts
type ExperienceState = {
  chapter: ChapterId
  sceneMode: SceneMode

  gnssState: "healthy" | "degrading" | "unreliable" | "unavailable"

  activeEvidence:
    | "gnss"
    | "imu"
    | "speed"
    | "road"
    | "memory"
    | "topology"
    | "peer"
    | "firedrill"
    | null

  selectedRoadEvent: string | null
  selectedPeer: string | null
  firedrillActive: boolean

  reducedMotion: boolean
}
```

The exact type definitions may differ in implementation.

Important:

-   chapter state must be global;
-   scene state must be local where possible;
-   components should not independently invent navigation state;
-   chapter transitions should be deterministic.

------------------------------------------------------------------------

# 19. DATA MODEL

The experience should use structured conceptual data rather than
hardcoding every visual element.

Example:

``` ts
type RoadEvent = {
  id: string
  type: string
  position: { lat: number; lng: number }
  confidenceLabel: string
  description: string
}

type PeerVehicle = {
  id: string
  position: { lat: number; lng: number }
  roadSegment: string
  state: string
  trustLabel: string
  relationship: string
}

type MemoryObservation = {
  id: string
  type: string
  roadSegment: string
  matchLabel: string
}
```

The values used for the experience can be illustrative.

Do not pretend that illustrative objects are measurements from the
actual prototype.

------------------------------------------------------------------------

# 20. ANIMATION SYSTEM

## 20.1 Principle

Animation must explain a relationship.

Good animation:

``` text
Evidence
   ↓
Trust
   ↓
Fusion
   ↓
State
```

Bad animation:

``` text
glow
particle
glow
particle
```

## 20.2 Recommended motion

-   route tracing;
-   evidence flowing toward fusion;
-   GNSS signal degrading;
-   memory marker appearing;
-   peer packet arriving;
-   topology rejection line;
-   shadow navigation splitting from real navigation;
-   architecture dependency highlighting.

## 20.3 Timing

Prefer:

-   short transitions for UI;
-   moderate transitions for system explanations;
-   slower camera movement for chapter transitions.

Avoid long animations that block exploration.

## 20.4 Reduced motion

When `prefers-reduced-motion` is enabled:

-   remove camera movement where possible;
-   replace animated traces with static highlighted states;
-   remove decorative motion;
-   preserve functional state changes.

------------------------------------------------------------------------

# 21. RESPONSIVE DESIGN

## 21.1 Desktop

Desktop is the primary immersive presentation mode.

Use:

-   map as large canvas;
-   side information panel;
-   chapter rail;
-   contextual technical overlays.

## 21.2 Tablet

Collapse:

-   chapter rail;
-   large side panels.

Preserve:

-   map;
-   core interaction;
-   technical explanation.

## 21.3 Mobile

Do not attempt to reproduce the desktop layout literally.

Use:

``` text
TOP
Chapter + state

CENTER
Map / evidence scene

BOTTOM
Technical explanation / interaction controls
```

Panels become bottom sheets.

Architecture diagrams may become:

-   vertically stacked;
-   horizontally scrollable;
-   focus-on-node interactions.

## 21.4 Touch

Interactive targets must be large enough for touch.

Avoid hover-only explanations.

Every hover interaction must have a tap/focus equivalent.

------------------------------------------------------------------------

# 22. ACCESSIBILITY

The experience must remain understandable without animation.

Requirements:

-   keyboard navigation;
-   visible focus;
-   semantic buttons;
-   accessible labels;
-   sufficient contrast;
-   reduced-motion support;
-   no essential information conveyed by colour alone;
-   touch-friendly targets;
-   readable technical metadata.

Interactive visualizations should provide textual descriptions.

Example:

Instead of only:

`green line`

provide:

`Validated road-memory observation`.

------------------------------------------------------------------------

# 23. PERFORMANCE

The site should feel like an engineered instrument, not a graphics
benchmark.

Priorities:

1.  fast initial shell;
2.  lazy-load heavy chapter assets;
3.  avoid giant textures;
4.  avoid unnecessary WebGL;
5.  keep map rendering efficient;
6.  reuse scene components;
7.  avoid rendering all chapter content simultaneously;
8.  clean up event listeners and animation loops;
9.  avoid memory leaks;
10. test mobile performance.

If a visual effect does not communicate system behaviour, remove it.

------------------------------------------------------------------------

# 24. TECHNICAL INTEGRITY RULES

These rules are critical.

## 24.1 No fabricated performance

Never invent measured:

-   accuracy;
-   drift;
-   confidence;
-   readiness;
-   latency;
-   model accuracy;
-   robustness.

## 24.2 No unsupported architecture claims

Do not claim:

-   tight GNSS coupling unless raw satellite measurements are available;
-   FOG-level performance unless such hardware is actually used;
-   lane-level positioning;
-   production-grade fleet communication;
-   validated vehicle-specific models;
-   validated road fingerprint database.

## 24.3 AI must have a specific job

Do not label a component simply:

`AI ENGINE`

Instead state what it does:

-   speed estimation;
-   motion classification;
-   road-event detection;
-   vehicle-response learning;
-   anomaly/context estimation.

## 24.4 Road evidence is probabilistic

RoadSense and RoadMemory are evidence.

They are not absolute ground truth.

## 24.5 CoNav is not GPS sharing

Peer state must include uncertainty/context.

The receiving vehicle evaluates the peer.

## 24.6 FireDrill is shadow mode

FireDrill does not control normal navigation.

It evaluates navigation.

------------------------------------------------------------------------

# 25. DEMO VIDEO FLOW

The recorded walkthrough should be approximately 3--4 minutes.

The video is a guided route through the richer site.

Recommended sequence:

## 0:00--0:25 --- Mission

Show:

-   TrueNorth;
-   road environment;
-   GNSS dependence.

Narrative:

> GNSS works until the environment makes it unreliable.

## 0:25--0:55 --- Failure

Show:

-   degradation;
-   outage;
-   conceptual inertial drift.

Narrative:

> Pure dead reckoning has the opposite problem: it continues, but
> uncertainty accumulates.

## 0:55--1:25 --- Core

Show:

-   Sense;
-   Learn;
-   Remember;
-   Cross-check;
-   Navigate;
-   Rehearse.

Narrative:

> TrueNorth does not replace one sensor with another. It builds a
> decision from evidence.

## 1:25--1:55 --- Road

Show:

-   RoadSense;
-   road event;
-   RoadMemory;
-   VehicleDNA.

Narrative:

> The road itself leaves information in the sensor stream.

## 1:55--2:25 --- Fusion

Show:

-   SoftGNSS;
-   TrustFusion;
-   TopoLock.

Narrative:

> The key is not whether a signal exists. It is how much it should
> influence the estimate.

## 2:25--2:55 --- CoNav

Show:

-   multiple vehicles;
-   peer evidence;
-   topology rejection.

Narrative:

> A nearby vehicle can become a witness, but only if its evidence is
> consistent.

## 2:55--3:25 --- FireDrill

Show:

-   shadow navigation;
-   self-evaluation;
-   readiness state.

Narrative:

> TrueNorth can rehearse a blackout before it happens.

## 3:25--3:45 --- System

Show:

-   complete architecture;
-   loop closing.

Final message:

> TrueNorth does not wait for one perfect sensor. It builds navigation
> from evidence.

------------------------------------------------------------------------

# 26. IMPLEMENTATION PHASES

The implementation should be divided into controlled phases.

## PHASE 0 --- Architecture Foundation

Implement:

-   project structure;
-   global experience state;
-   routing/chapter state;
-   component primitives;
-   design tokens;
-   responsive shell;
-   map abstraction;
-   animation utilities;
-   accessibility foundations.

Do not build all chapter details.

## PHASE 1 --- Global Shell

Implement:

-   visual identity;
-   chapter navigator;
-   map canvas;
-   global technical panel;
-   scene transition system;
-   responsive controls.

## PHASE 2 --- Mission

Implement Chapter 01.

## PHASE 3 --- Failure

Implement Chapter 02.

## PHASE 4 --- Core

Implement Chapter 03.

## PHASE 5 --- Road Intelligence

Implement Chapter 04.

## PHASE 6 --- Trust & Fusion

Implement Chapter 05.

## PHASE 7 --- CoNav

Implement Chapter 06.

## PHASE 8 --- FireDrill

Implement Chapter 07.

## PHASE 9 --- System + Integration

Implement Chapter 08 plus:

-   cross-chapter transitions;
-   final responsive pass;
-   accessibility pass;
-   performance pass;
-   console/import cleanup;
-   visual consistency;
-   demo walkthrough polish.

------------------------------------------------------------------------

# 27. PHASE IMPLEMENTATION RULE

For every phase, the implementation agent must:

1.  read `AGENTS.md`;
2.  read `TRUE-NORTH-EXPERIENCE.md`;
3.  inspect the existing codebase;
4.  identify reusable components;
5.  implement only the requested phase;
6.  preserve previously implemented chapters;
7.  avoid redesigning the visual language;
8.  avoid introducing new colour systems;
9.  avoid inventing unsupported technical claims;
10. test desktop;
11. test mobile;
12. test keyboard interaction;
13. test reduced motion;
14. check browser console;
15. check import/build errors.

If an implementation decision conflicts with this document, stop and
resolve the conflict against the source of truth rather than silently
inventing a new direction.

------------------------------------------------------------------------

# 28. ANTI-PATTERNS

The following are explicitly prohibited.

## 28.1 Generic SaaS dashboard

Avoid:

-   KPI cards everywhere;
-   huge analytics grids;
-   generic sidebar dashboards;
-   rounded-card overload.

## 28.2 Cyberpunk AI aesthetic

Avoid:

-   neon cyan;
-   neon purple;
-   excessive glow;
-   holograms;
-   futuristic particle fields;
-   "AI brain" graphics.

## 28.3 Fake navigation simulator

Avoid:

-   pretending to provide real-time vehicle navigation;
-   fabricated accuracy metrics;
-   fake sensor telemetry presented as measured;
-   fake readiness scores.

## 28.4 Decorative 3D

Avoid:

-   giant spinning cars;
-   unnecessary 3D terrain;
-   decorative satellites;
-   cinematic effects without information value.

## 28.5 Feature dump

Avoid presenting:

``` text
SoftGNSS
RoadSense
CoNav
FireDrill
...
```

as unrelated feature cards.

They must be connected through the evidence loop.

## 28.6 Excessive modals

Prefer contextual panels and direct manipulation.

## 28.7 Overwritten copy

Avoid long paragraphs inside the experience.

Use:

-   short statements;
-   technical labels;
-   diagrams;
-   progressive disclosure.

------------------------------------------------------------------------

# 29. CONTENT HIERARCHY

Every scene should answer three levels.

### LEVEL 1 --- What is happening?

One sentence.

### LEVEL 2 --- Why does it matter?

One concise explanation.

### LEVEL 3 --- How does it work?

Interactive technical detail.

Example:

``` text
WHAT
GNSS confidence is falling.

WHY
A degraded signal should not influence navigation as strongly.

HOW
SoftGNSS adapts measurement trust using signal-quality and consistency evidence.
```

This prevents the experience from becoming either too superficial or too
dense.

------------------------------------------------------------------------

# 30. FINAL QUALITY BAR

Before considering the experience complete, ask:

### Narrative

-   Can a reviewer understand the problem within 30 seconds?
-   Is the GNSS failure story obvious?
-   Is the evidence-based approach clear?

### Technical

-   Is each innovation explained accurately?
-   Is SoftGNSS clearly differentiated from binary GNSS switching?
-   Is RoadSense clearly probabilistic?
-   Is RoadMemory clearly persistent evidence?
-   Is VehicleDNA clearly a learned vehicle response profile?
-   Is CoNav clearly confidence-weighted?
-   Is FireDrill clearly shadow evaluation?
-   Is TrustFusion visibly the decision layer?

### Visual

-   Does the map feel like the main world?
-   Does the interface feel like an engineering instrument?
-   Are the colours restrained?
-   Is the system readable without decorative effects?

### Interaction

-   Does every major interaction teach something?
-   Can users inspect evidence?
-   Can users trace constraints?
-   Can users understand cause and effect?

### Integrity

-   Are illustrative values labelled?
-   Are unsupported performance claims absent?
-   Are conceptual simulations clearly distinguishable from real
    measurements?

### Responsive

-   Does the story survive on mobile?
-   Are panels usable by touch?
-   Are architecture diagrams readable?

### Accessibility

-   Does keyboard navigation work?
-   Does reduced motion work?
-   Is colour not the only source of meaning?

### Demo

-   Can the entire story be demonstrated in approximately 3--4 minutes?
-   Does the site still reward deeper exploration after the video ends?

------------------------------------------------------------------------

# 31. FINAL EXPERIENCE IDENTITY

The experience should leave the reviewer with one mental model:

``` text
             ┌───────────────┐
             │     SENSE     │
             └───────┬───────┘
                     ▼
             ┌───────────────┐
             │     LEARN     │
             └───────┬───────┘
                     ▼
             ┌───────────────┐
             │    REMEMBER   │
             └───────┬───────┘
                     ▼
             ┌───────────────┐
             │ CROSS-CHECK   │
             └───────┬───────┘
                     ▼
             ┌───────────────┐
             │   NAVIGATE    │
             └───────┬───────┘
                     ▼
             ┌───────────────┐
             │   REHEARSE    │
             └───────┬───────┘
                     │
                     └──────► LEARN AGAIN
```

The final conceptual statement is:

> **TrueNorth does not depend on one perfect sensor.**
>
> **It turns sensor signals, learned motion, road memory, topology, and
> cooperative evidence into a continuously cross-checked navigation
> estimate.**

That is the identity of the entire experience.

------------------------------------------------------------------------

# 32. IMPLEMENTATION AGENT CHECKLIST

Before writing code:

-   [ ] Read `AGENTS.md`.
-   [ ] Read this document.
-   [ ] Inspect existing repository.
-   [ ] Identify framework and current entry points.
-   [ ] Identify existing components.
-   [ ] Do not replace working infrastructure unnecessarily.
-   [ ] Confirm the current implementation phase.

During implementation:

-   [ ] Reuse existing design tokens.
-   [ ] Reuse existing scene primitives.
-   [ ] Keep state centralized.
-   [ ] Keep interactions meaningful.
-   [ ] Keep technical claims grounded.
-   [ ] Avoid fake performance data.
-   [ ] Avoid generic AI aesthetics.
-   [ ] Avoid unnecessary dependencies.

After implementation:

-   [ ] Build passes.
-   [ ] No import errors.
-   [ ] No obvious console errors.
-   [ ] Desktop checked.
-   [ ] Mobile checked.
-   [ ] Keyboard checked.
-   [ ] Reduced-motion checked.
-   [ ] Existing chapters still work.
-   [ ] New interaction communicates a technical concept.
-   [ ] Visual system remains consistent.

------------------------------------------------------------------------

# 33. SOURCE-OF-TRUTH RULE

When implementation details are ambiguous, use this priority:

``` text
1. Actual validated implementation/data
2. AGENTS.md
3. TRUE-NORTH-EXPERIENCE.md
4. Existing project architecture
5. Explicit phase prompt
6. Reasonable implementation inference
```

Never use an implementation convenience as justification for inventing a
technical claim.

If the actual prototype later differs from this conceptual experience,
update the relevant documentation and UI rather than allowing the
website to imply capabilities that do not exist.

------------------------------------------------------------------------

# END

**TrueNorth --- Intelligent Dead Reckoning for GNSS-Degraded
Environments**

**Sense → Learn → Remember → Cross-check → Navigate → Rehearse → Learn
again**
