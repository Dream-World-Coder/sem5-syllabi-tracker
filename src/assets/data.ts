export const coursesData = [
  {
    code: "IT3101",
    name: "Microprocessor and microcontroller",
    modules: [
      {
        name: "Introduction to 8085A CPU",
        lectures: 2,
        topics:
          "Pin description and features, architecture-register organization.",
      },
      {
        name: "8085 Addressing",
        lectures: 3,
        topics:
          "Different addressing modes and their features, instruction set, instruction cycle, machine cycle, timing diagram.",
      },
      {
        name: "8085 Assembly language programming",
        lectures: 3,
        topics: "Assembly programming.",
      },
      {
        name: "Hardware interfacing",
        lectures: 4,
        topics:
          "Interfacing memory, peripheral chips (IO mapped IO and Memory mapped IO), interrupts and DMA.",
      },
      {
        name: "16 bit processors: 8086",
        lectures: 4,
        topics:
          "Architecture, segmented memory cycles, read/write cycle, min/max mode, reset operation, wait state, halt state, hold state, lock operation, interrupt processing.",
      },
      {
        name: "8086 Addressing modes",
        lectures: 6,
        topics:
          "Software instruction set, string instructions, repeat, segment override, lock prefix, assembly programming.",
      },
      {
        name: "8051 Microcontroller",
        lectures: 6,
        topics:
          "Architecture, memory management, instruction set, assembly programming.",
      },
      {
        name: "ARM RISC architecture",
        lectures: 8,
        topics: "Memory management, instruction set, assembly programming.",
      },
      {
        name: "Raspberry Pi and Arduino",
        lectures: 6,
        topics: "Overview and application development.",
      },
    ],
  },
  {
    code: "IT3102",
    name: "Operating systems",
    modules: [
      {
        name: "Introduction",
        lectures: 4,
        topics:
          "Operating system, evolution, batch-processing, multiprocessing, multiprogramming, timesharing, real-time operations, interrupt handler.",
      },
      {
        name: "Process concepts",
        lectures: 4,
        topics:
          "Process, synchronization, scheduling, IPC, RPC, hardware requirements, threads.",
      },
      {
        name: "Threads",
        lectures: 2,
        topics: "Multithreaded model, scheduler activations.",
      },
      {
        name: "Scheduling",
        lectures: 6,
        topics:
          "CPU scheduling: short/medium/long term, non-preemptive and preemptive algorithms.",
      },
      {
        name: "Process synchronization",
        lectures: 8,
        topics:
          "Critical section, semaphores, classical problems, concurrency.",
      },
      {
        name: "Deadlocks",
        lectures: 5,
        topics: "Modeling, detection, prevention, avoidance, recovery.",
      },
      {
        name: "Memory management",
        lectures: 8,
        topics:
          "Partitioning, paging, virtual memory, page replacement, segmentation, hardware support.",
      },
      {
        name: "Device management",
        lectures: 3,
        topics:
          "Scheduling algorithms FCFS, SSTF, SCAN, C-SCAN, LOOK, C-LOOK, device drivers.",
      },
      {
        name: "File management",
        lectures: 6,
        topics:
          "File concept, directories, file strategies, protection, allocation.",
      },
      {
        name: "Case study",
        lectures: 2,
        topics: "UNIX/Linux, Windows, Android.",
      },
    ],
  },
  {
    code: "IT3103",
    name: "Database management system",
    modules: [
      {
        name: "Introduction",
        lectures: 4,
        topics: "Database vs file systems, view of data, languages, users.",
      },
      {
        name: "Data models",
        lectures: 4,
        topics:
          "Network, relational, hierarchical, object oriented, data independence.",
      },
      {
        name: "ER model",
        lectures: 6,
        topics: "Constraints, keys, ER diagrams, extended E-R, ER→Relational.",
      },
      {
        name: "Query languages",
        lectures: 4,
        topics: "Relational algebra, calculus, SQL, QBE.",
      },
      {
        name: "Relational design",
        lectures: 6,
        topics: "Functional dependency, normal forms, lossless design.",
      },
      {
        name: "Storage strategies",
        lectures: 4,
        topics: "Ordered/unordered file, hashing, indexing, B tree, B+ tree.",
      },
      {
        name: "Query processing",
        lectures: 4,
        topics: "Expression evaluation, SELECT/JOIN/PROJECT, optimization.",
      },
      {
        name: "Transaction processing",
        lectures: 8,
        topics:
          "Schedules, serializability, concurrency control, locks, timestamp, MVCC.",
      },
      {
        name: "Recovery",
        lectures: 2,
        topics: "Immediate/deferred update, shadow paging.",
      },
      {
        name: "Advanced topics",
        lectures: 2,
        topics: "Web DB, distributed DB, data warehouse, data mining.",
      },
    ],
  },
  {
    code: "IT3104",
    name: "Algorithms",
    modules: [
      {
        name: "Models of computation",
        lectures: 6,
        topics: "Complexity, asymptotic notations.",
      },
      { name: "Sorting and searching", lectures: 6, topics: "Trees, hashing." },
      {
        name: "Advanced data structures",
        lectures: 5,
        topics: "RB trees, Fibonacci heaps, disjoint sets.",
      },
      { name: "Lower bound theory", lectures: 2, topics: "Lower bounds." },
      {
        name: "Optimization problems",
        lectures: 6,
        topics: "DP, greedy, theory foundations.",
      },
      {
        name: "Graph algorithms",
        lectures: 6,
        topics:
          "Amortized analysis, BFS/DFS, CC, spanning, shortest paths, max flow.",
      },
      {
        name: "Randomized algorithms",
        lectures: 4,
        topics: "Identity testing, primality, min cut.",
      },
      {
        name: "Complexity classes",
        lectures: 6,
        topics: "P, NP, NP-complete.",
      },
    ],
  },
  {
    code: "IT3105",
    name: "Information and coding theory",
    modules: [
      {
        name: "Introduction",
        lectures: 2,
        topics: "Data and information, channels.",
      },
      {
        name: "Basics of information theory",
        lectures: 6,
        topics: "Entropy, relative entropy, mutual information, capacity.",
      },
      {
        name: "Models of sources/channels/noise",
        lectures: 8,
        topics:
          "Discrete/continuous sources, BSC, Gaussian channel, AWGN, Markov source.",
      },
      {
        name: "Source and channel coding",
        lectures: 4,
        topics: "Source coding theorem, channel coding theorem.",
      },
      {
        name: "Quantum information theory",
        lectures: 4,
        topics: "von Neumann entropy, quantum mutual info.",
      },
      {
        name: "Coding theory",
        lectures: 12,
        topics:
          "Block, cyclic, CRC, BCH, Reed-Solomon, Golay, convolutional, LDPC, Viterbi.",
      },
      {
        name: "STC coding",
        lectures: 4,
        topics: "SISO, MIMO, space-time coding.",
      },
    ],
  },
];
