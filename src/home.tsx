import React, { useState, useEffect } from "react";
import { ChevronDown, Download, Upload, Menu, X } from "lucide-react";

// Types
interface Module {
  id: string;
  name: string;
  lectures: number;
  topics: string;
  notes: string;
  completed: boolean;
}

interface Course {
  code: string;
  name: string;
  pyq2023: boolean;
  pyq2024: boolean;
  modules: Module[];
}

type FilterType = "all" | "incomplete" | "pyq2023" | "pyq2024" | "completed";
type SortType = "completion" | "lectures" | null;

// Course data
const coursesData = [
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

const SyllabusTracker = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");
  const [sort, setSort] = useState<SortType>(null);
  const [expandedModules, setExpandedModules] = useState<Set<string>>(
    new Set(),
  );
  const [expandedCourses, setExpandedCourses] = useState<Set<string>>(
    new Set(),
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Initialize state
  useEffect(() => {
    const stored = localStorage.getItem("syllabusData");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setCourses(parsed);
        // Expand all courses by default
        setExpandedCourses(new Set(parsed.map((c: Course) => c.code)));
      } catch (e) {
        initializeCourses();
      }
    } else {
      initializeCourses();
    }
  }, []);

  const initializeCourses = () => {
    const initialized = coursesData.map((course, idx) => ({
      ...course,
      pyq2023: false,
      pyq2024: false,
      modules: course.modules.map((module, mIdx) => ({
        ...module,
        id: `${course.code}-${mIdx}`,
        notes: "",
        completed: false,
      })),
    }));
    setCourses(initialized);
    // Expand all courses by default
    setExpandedCourses(new Set(initialized.map((c) => c.code)));
  };

  // Save to localStorage
  useEffect(() => {
    if (courses.length > 0) {
      localStorage.setItem("syllabusData", JSON.stringify(courses));
    }
  }, [courses]);

  // Calculate completion
  const getCourseCompletion = (course: Course) => {
    if (course.modules.length === 0) return 0;
    const completedModules = course.modules.filter((m) => m.completed).length;
    const moduleCompletion = (completedModules / course.modules.length) * 70;
    let pyqCompletion = 0;
    if (course.pyq2023) pyqCompletion += 15;
    if (course.pyq2024) pyqCompletion += 15;
    return moduleCompletion + pyqCompletion;
  };

  const getGlobalCompletion = () => {
    if (courses.length === 0) return 0;
    const total = courses.reduce(
      (sum, course) => sum + getCourseCompletion(course),
      0,
    );
    return total / courses.length;
  };

  // Filtering and sorting
  const getFilteredAndSortedCourses = () => {
    let filtered = courses.filter((course) => {
      switch (filter) {
        case "incomplete":
          return (
            course.modules.some((m) => !m.completed) ||
            !course.pyq2023 ||
            !course.pyq2024
          );
        case "pyq2023":
          return !course.pyq2023;
        case "pyq2024":
          return !course.pyq2024;
        case "completed":
          return (
            course.modules.every((m) => m.completed) &&
            course.pyq2023 &&
            course.pyq2024
          );
        default:
          return true;
      }
    });

    if (sort === "completion") {
      filtered.sort((a, b) => getCourseCompletion(a) - getCourseCompletion(b));
    } else if (sort === "lectures") {
      filtered.sort((a, b) => {
        const aRemaining = a.modules.reduce(
          (sum, m) => sum + (m.completed ? 0 : m.lectures),
          0,
        );
        const bRemaining = b.modules.reduce(
          (sum, m) => sum + (m.completed ? 0 : m.lectures),
          0,
        );
        return bRemaining - aRemaining;
      });
    }

    return filtered;
  };

  // Handlers
  const toggleModuleCompletion = (courseCode: string, moduleId: string) => {
    setCourses((prev) =>
      prev.map((course) => {
        if (course.code === courseCode) {
          return {
            ...course,
            modules: course.modules.map((module) =>
              module.id === moduleId
                ? { ...module, completed: !module.completed }
                : module,
            ),
          };
        }
        return course;
      }),
    );
  };

  const updateModuleNotes = (
    courseCode: string,
    moduleId: string,
    notes: string,
  ) => {
    setCourses((prev) =>
      prev.map((course) => {
        if (course.code === courseCode) {
          return {
            ...course,
            modules: course.modules.map((module) =>
              module.id === moduleId ? { ...module, notes } : module,
            ),
          };
        }
        return course;
      }),
    );
  };

  const togglePYQ = (courseCode: string, year: "pyq2023" | "pyq2024") => {
    setCourses((prev) =>
      prev.map((course) =>
        course.code === courseCode
          ? { ...course, [year]: !course[year] }
          : course,
      ),
    );
  };

  const toggleModuleExpanded = (moduleId: string) => {
    setExpandedModules((prev) => {
      const next = new Set(prev);
      if (next.has(moduleId)) {
        next.delete(moduleId);
      } else {
        next.add(moduleId);
      }
      return next;
    });
  };

  const toggleCourseExpanded = (courseCode: string) => {
    setExpandedCourses((prev) => {
      const next = new Set(prev);
      if (next.has(courseCode)) {
        next.delete(courseCode);
      } else {
        next.add(courseCode);
      }
      return next;
    });
  };

  const scrollToCourse = (courseCode: string) => {
    const element = document.getElementById(`course-${courseCode}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      // Expand the course if it's collapsed
      if (!expandedCourses.has(courseCode)) {
        toggleCourseExpanded(courseCode);
      }
    }
    setSidebarOpen(false);
  };

  const exportData = () => {
    const dataStr = JSON.stringify(courses, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `syllabus-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string);
        setCourses(imported);
        setExpandedCourses(new Set(imported.map((c: Course) => c.code)));
      } catch (error) {
        alert("Failed to import file");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const filteredCourses = getFilteredAndSortedCourses();
  const globalCompletion = getGlobalCompletion();

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      {/* Mobile sidebar toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white border border-neutral-200 rounded-lg shadow-sm"
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
        fixed top-0 left-0 h-full w-64 bg-white border-r border-neutral-200 z-40
        transform transition-transform duration-200 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}
      >
        <div className="p-6 border-b border-neutral-200">
          <h2 className="text-sm uppercase tracking-wider text-neutral-400 font-medium mb-3">
            Courses
          </h2>
          <div className="space-y-2">
            {courses.map((course) => {
              const completion = getCourseCompletion(course);
              return (
                <button
                  key={course.code}
                  onClick={() => scrollToCourse(course.code)}
                  className="w-full text-left group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-neutral-900">
                      {course.code}
                    </span>
                    <span className="text-xs text-neutral-400 tabular-nums">
                      {Math.round(completion)}%
                    </span>
                  </div>
                  <div className="h-1 bg-neutral-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-neutral-900 transition-all duration-300"
                      style={{ width: `${completion}%` }}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xs uppercase tracking-wider text-neutral-400 font-medium mb-3">
            Overall progress
          </h3>
          <div className="text-3xl font-light tabular-nums mb-4">
            {Math.round(globalCompletion)}%
          </div>

          <div className="space-y-2">
            <button
              onClick={exportData}
              className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 text-sm bg-neutral-900 text-white rounded hover:bg-neutral-800 transition-colors"
            >
              <Download size={14} />
              Export data
            </button>
            <label className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 text-sm bg-white text-neutral-700 border border-neutral-200 rounded hover:border-neutral-400 transition-colors cursor-pointer">
              <Upload size={14} />
              Import data
              <input
                type="file"
                accept=".json"
                onChange={importData}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-20 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="lg:ml-64 px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-12 text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl font-light tracking-tight mb-2">
            Syllabus tracker
          </h1>
          <p className="text-sm text-neutral-500">
            Track your learning progress
          </p>
        </div>

        {/* Controls */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="flex flex-wrap gap-2">
              {[
                { value: "all", label: "All" },
                { value: "incomplete", label: "Incomplete" },
                { value: "pyq2023", label: "PYQ 2023" },
                { value: "pyq2024", label: "PYQ 2024" },
                { value: "completed", label: "Completed" },
              ].map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => setFilter(value as FilterType)}
                  className={`px-3 py-1.5 text-sm border rounded transition-colors ${
                    filter === value
                      ? "bg-neutral-900 text-white border-neutral-900"
                      : "bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            {[
              { value: "completion", label: "By completion" },
              { value: "lectures", label: "By lectures" },
            ].map(({ value, label }) => (
              <button
                key={value}
                onClick={() =>
                  setSort(sort === value ? null : (value as SortType))
                }
                className={`px-3 py-1.5 text-sm border rounded transition-colors ${
                  sort === value
                    ? "bg-neutral-900 text-white border-neutral-900"
                    : "bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Courses */}
        <div className="max-w-4xl mx-auto space-y-6">
          {filteredCourses.length === 0 ? (
            <div className="text-center py-16 text-neutral-400">
              <div className="text-4xl mb-3">📚</div>
              <div className="text-sm">No modules match the current filter</div>
            </div>
          ) : (
            filteredCourses.map((course) => {
              const completion = getCourseCompletion(course);
              const completedCount = course.modules.filter(
                (m) => m.completed,
              ).length;
              const isExpanded = expandedCourses.has(course.code);

              return (
                <div
                  key={course.code}
                  id={`course-${course.code}`}
                  className="bg-white border border-neutral-200 rounded-lg overflow-hidden scroll-mt-8"
                >
                  {/* Course header - clickable */}
                  <button
                    onClick={() => toggleCourseExpanded(course.code)}
                    className="w-full p-4 sm:p-6 hover:bg-neutral-50 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                      <div className="flex-1 text-left">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="text-xs uppercase tracking-wider text-neutral-400 font-medium">
                            {course.code}
                          </div>
                          <ChevronDown
                            size={16}
                            className={`text-neutral-400 transition-transform ${
                              isExpanded ? "rotate-180" : ""
                            }`}
                          />
                        </div>
                        <h2 className="text-xl font-light">{course.name}</h2>
                      </div>

                      <div
                        className="flex gap-3"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {["2023", "2024"].map((year) => {
                          const key = `pyq${year}` as "pyq2023" | "pyq2024";
                          return (
                            <button
                              key={year}
                              onClick={(e) => {
                                e.stopPropagation();
                                togglePYQ(course.code, key);
                              }}
                              className="flex items-center gap-2 group"
                            >
                              <span className="text-xs text-neutral-500">
                                PYQ {year}
                              </span>
                              <div
                                className={`relative w-9 h-5 rounded-full transition-colors ${
                                  course[key]
                                    ? "bg-neutral-900"
                                    : "bg-neutral-200"
                                }`}
                              >
                                <div
                                  className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${
                                    course[key] ? "translate-x-4" : ""
                                  }`}
                                />
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-neutral-900 transition-all duration-500"
                          style={{ width: `${completion}%` }}
                        />
                      </div>
                      <div className="text-sm text-neutral-500 tabular-nums">
                        {Math.round(completion)}% · {completedCount}/
                        {course.modules.length}
                      </div>
                    </div>
                  </button>

                  {/* Modules - collapsible */}
                  {isExpanded && (
                    <div className="px-4 pb-4 sm:px-6 sm:pb-6 space-y-2">
                      {course.modules.map((module) => {
                        const isModuleExpanded = expandedModules.has(module.id);

                        return (
                          <div
                            key={module.id}
                            className="border border-neutral-200 rounded-lg overflow-hidden"
                          >
                            <button
                              onClick={() => toggleModuleExpanded(module.id)}
                              className="w-full px-4 py-3 flex items-center gap-3 hover:bg-neutral-50 transition-colors"
                            >
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleModuleCompletion(
                                    course.code,
                                    module.id,
                                  );
                                }}
                                className={`flex-shrink-0 w-5 h-5 border-2 rounded transition-colors ${
                                  module.completed
                                    ? "bg-neutral-900 border-neutral-900"
                                    : "border-neutral-300 hover:border-neutral-500"
                                }`}
                              >
                                {module.completed && (
                                  <div className="text-white text-xs leading-none">
                                    ✓
                                  </div>
                                )}
                              </button>

                              <div className="flex-1 text-left">
                                <div className="text-sm font-normal">
                                  {module.name}
                                </div>
                              </div>

                              <div className="text-xs text-neutral-500 tabular-nums">
                                {module.lectures} lectures
                              </div>

                              <ChevronDown
                                size={16}
                                className={`text-neutral-400 transition-transform ${
                                  isModuleExpanded ? "rotate-180" : ""
                                }`}
                              />
                            </button>

                            {isModuleExpanded && (
                              <div className="px-4 pb-4 pt-1 border-t border-neutral-100 bg-neutral-50">
                                <div className="mb-3">
                                  <div className="text-xs uppercase tracking-wider text-neutral-400 font-medium mb-1.5">
                                    Topics covered
                                  </div>
                                  <div className="text-sm text-neutral-600 leading-relaxed">
                                    {module.topics}
                                  </div>
                                </div>

                                <div>
                                  <div className="text-xs uppercase tracking-wider text-neutral-400 font-medium mb-1.5">
                                    Personal notes
                                  </div>
                                  <textarea
                                    value={module.notes}
                                    onChange={(e) =>
                                      updateModuleNotes(
                                        course.code,
                                        module.id,
                                        e.target.value,
                                      )
                                    }
                                    placeholder="Add your notes here..."
                                    className="w-full min-h-[80px] px-3 py-2 text-sm bg-white border border-neutral-200 rounded resize-y focus:outline-none focus:ring-1 focus:ring-neutral-400"
                                    onClick={(e) => e.stopPropagation()}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
};

export default SyllabusTracker;
