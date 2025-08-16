"use client"

import { useState, useEffect } from "react"

const TeamAssemble = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [secretKey, setSecretKey] = useState("")
  const [userRole, setUserRole] = useState("member") // 'lead' or 'member'
  const [showLogin, setShowLogin] = useState(false)
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState({
    title: "",
    assignedTo: "Dev Team",
    priority: "Medium",
  })

  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1024)

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem("mlsc_tasks")
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks))
    }
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize)
      return () => window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("mlsc_tasks", JSON.stringify(tasks))
  }, [tasks])

  const isMobile = windowWidth < 768
  const isTablet = windowWidth >= 768 && windowWidth < 1024

  const handleLogin = () => {
    // Secret keys for different roles
    if (secretKey === "mlsc2024lead") {
      setIsAuthenticated(true)
      setUserRole("lead")
      setShowLogin(false)
    } else if (secretKey === "mlsc2024") {
      setIsAuthenticated(true)
      setUserRole("member")
      setShowLogin(false)
    } else {
      alert("Invalid secret key. Please contact your team lead.")
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUserRole("member")
    setSecretKey("")
    setShowLogin(false)
  }

  const addTask = () => {
    if (!newTask.title.trim()) {
      alert("Please enter a task title")
      return
    }

    const task = {
      id: Date.now(),
      title: newTask.title,
      assignedTo: newTask.assignedTo,
      priority: newTask.priority,
      status: "PENDING",
      createdBy: userRole === "lead" ? "Lead" : "Member",
      createdAt: new Date().toLocaleDateString(),
    }

    setTasks([...tasks, task])
    setNewTask({ title: "", assignedTo: "Dev Team", priority: "Medium" })
  }

  const updateTaskStatus = (taskId, newStatus) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task)))
  }

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId))
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "#ef4444"
      case "Medium":
        return "#3b82f6"
      case "Low":
        return "#10b981"
      default:
        return "#6b7280"
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "PENDING":
        return "#f59e0b"
      case "IN PROGRESS":
        return "#3b82f6"
      case "COMPLETED":
        return "#10b981"
      default:
        return "#6b7280"
    }
  }

  const taskCounts = {
    pending: tasks.filter((task) => task.status === "PENDING").length,
    inProgress: tasks.filter((task) => task.status === "IN PROGRESS").length,
    completed: tasks.filter((task) => task.status === "COMPLETED").length,
  }

  // Initial landing page
  if (!showLogin && !isAuthenticated) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e40af 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, -apple-system, sans-serif",
          padding: isMobile ? "1rem" : "2rem",
        }}
      >
        <div
          style={{
            background: "rgba(30, 41, 59, 0.8)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(148, 163, 184, 0.2)",
            borderRadius: "12px",
            padding: isMobile ? "1.5rem" : "2rem",
            textAlign: "center",
            color: "white",
            maxWidth: "400px",
            width: "100%",
          }}
        >
          <div
            style={{
              width: isMobile ? "50px" : "60px",
              height: isMobile ? "50px" : "60px",
              background: "linear-gradient(45deg, #3b82f6, #8b5cf6)",
              borderRadius: "50%",
              margin: "0 auto 1.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: isMobile ? "20px" : "24px",
              fontWeight: "bold",
            }}
          >
            TA
          </div>
          <h2 style={{ margin: "0 0 0.5rem 0", fontSize: isMobile ? "1.25rem" : "1.5rem", fontWeight: "600" }}>
            TeamAssemble
          </h2>
          <p style={{ margin: "0 0 2rem 0", color: "#cbd5e1", fontSize: "0.9rem" }}>Team management system</p>
          <button
            onClick={() => setShowLogin(true)}
            style={{
              background: "linear-gradient(45deg, #3b82f6, #1d4ed8)",
              color: "white",
              border: "none",
              borderRadius: "8px",
              padding: isMobile ? "10px 20px" : "12px 24px",
              fontSize: "1rem",
              fontWeight: "500",
              cursor: "pointer",
              width: "100%",
              transition: "all 0.2s",
            }}
            onMouseOver={(e) => (e.target.style.transform = "translateY(-1px)")}
            onMouseOut={(e) => (e.target.style.transform = "translateY(0)")}
          >
            Access Team Management
          </button>
        </div>
      </div>
    )
  }

  // Login page
  if (showLogin && !isAuthenticated) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e40af 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, -apple-system, sans-serif",
          padding: isMobile ? "1rem" : "2rem",
        }}
      >
        <div
          style={{
            background: "rgba(30, 41, 59, 0.8)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(148, 163, 184, 0.2)",
            borderRadius: "12px",
            padding: isMobile ? "1.5rem" : "2rem",
            color: "white",
            maxWidth: "400px",
            width: "100%",
          }}
        >
          <div
            style={{
              width: isMobile ? "50px" : "60px",
              height: isMobile ? "50px" : "60px",
              background: "linear-gradient(45deg, #3b82f6, #8b5cf6)",
              borderRadius: "50%",
              margin: "0 auto 1.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: isMobile ? "20px" : "24px",
              fontWeight: "bold",
            }}
          >
            TA
          </div>
          <h2
            style={{
              margin: "0 0 0.5rem 0",
              fontSize: isMobile ? "1.25rem" : "1.5rem",
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            TeamAssemble Access
          </h2>
          <p style={{ margin: "0 0 2rem 0", color: "#cbd5e1", fontSize: "0.9rem", textAlign: "center" }}>
            Enter the secret key to access the team management system
          </p>

          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem", fontWeight: "500" }}>
              Secret Key
            </label>
            <input
              type="password"
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              placeholder="Enter secret key"
              style={{
                width: "100%",
                padding: isMobile ? "10px" : "12px",
                borderRadius: "8px",
                border: "1px solid rgba(148, 163, 184, 0.3)",
                background: "rgba(15, 23, 42, 0.5)",
                color: "white",
                fontSize: "1rem",
                boxSizing: "border-box",
              }}
              onKeyPress={(e) => e.key === "Enter" && handleLogin()}
            />
          </div>

          <button
            onClick={handleLogin}
            style={{
              background: "linear-gradient(45deg, #3b82f6, #1d4ed8)",
              color: "white",
              border: "none",
              borderRadius: "8px",
              padding: isMobile ? "10px 20px" : "12px 24px",
              fontSize: "1rem",
              fontWeight: "500",
              cursor: "pointer",
              width: "100%",
              marginBottom: "1rem",
              transition: "all 0.2s",
            }}
            onMouseOver={(e) => (e.target.style.transform = "translateY(-1px)")}
            onMouseOut={(e) => (e.target.style.transform = "translateY(0)")}
          >
            Access Team Management
          </button>

          <p style={{ margin: "0", color: "#94a3b8", fontSize: "0.8rem", textAlign: "center" }}>
            Don't have access? Contact your team lead for the secret key.
          </p>

          <button
            onClick={() => setShowLogin(false)}
            style={{
              background: "transparent",
              color: "#94a3b8",
              border: "none",
              cursor: "pointer",
              fontSize: "0.9rem",
              marginTop: "1rem",
              width: "100%",
            }}
          >
            ← Back
          </button>
        </div>
      </div>
    )
  }

  // Main dashboard
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e40af 100%)",
        fontFamily: "system-ui, -apple-system, sans-serif",
        color: "white",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "rgba(15, 23, 42, 0.8)",
          backdropFilter: "blur(10px)",
          padding: isMobile ? "1rem" : "1rem 2rem",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: isMobile ? "flex-start" : "center",
          borderBottom: "1px solid rgba(148, 163, 184, 0.2)",
          gap: isMobile ? "1rem" : "0",
        }}
      >
        <h1 style={{ margin: 0, fontSize: isMobile ? "1rem" : "1.25rem", fontWeight: "600" }}>
          {isMobile ? "MLSC - TeamAssemble" : "MLSC VCET - TeamAssemble"}
        </h1>
        <div
          style={{
            display: "flex",
            flexDirection: isMobile && windowWidth < 480 ? "column" : "row",
            gap: isMobile && windowWidth < 480 ? "0.5rem" : "1rem",
            alignItems: isMobile && windowWidth < 480 ? "flex-start" : "center",
            width: isMobile ? "100%" : "auto",
          }}
        >
          <span
            style={{
              background: userRole === "lead" ? "#dc2626" : "#059669",
              padding: "4px 12px",
              borderRadius: "20px",
              fontSize: "0.8rem",
              fontWeight: "500",
            }}
          >
            Role: {userRole}
          </span>
          <button
            onClick={handleLogout}
            style={{
              background: "#374151",
              color: "white",
              border: "none",
              borderRadius: "6px",
              padding: "8px 16px",
              fontSize: "0.9rem",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      </div>

      <div style={{ padding: isMobile ? "1rem" : "2rem" }}>
        {/* Dashboard Header */}
        <div style={{ marginBottom: "2rem" }}>
          <h2 style={{ margin: "0 0 0.5rem 0", fontSize: isMobile ? "1.5rem" : "2rem", fontWeight: "700" }}>
            Team Management Dashboard
          </h2>
          <p style={{ margin: 0, color: "#cbd5e1", fontSize: isMobile ? "0.85rem" : "1rem" }}>
            Manage tasks and collaborate with your MLSC team
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr" : "1fr 2fr",
            gap: isMobile ? "1rem" : "2rem",
            marginBottom: "2rem",
          }}
        >
          {/* Add New Task */}
          {userRole === "lead" && (
            <div
              style={{
                background: "rgba(30, 41, 59, 0.6)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(148, 163, 184, 0.2)",
                borderRadius: "12px",
                padding: isMobile ? "1rem" : "1.5rem",
              }}
            >
              <h3 style={{ margin: "0 0 1rem 0", fontSize: "1.1rem", fontWeight: "600" }}>Add New Task</h3>

              <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem" }}>Task Title</label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  placeholder="Enter task title"
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "6px",
                    border: "1px solid rgba(148, 163, 184, 0.3)",
                    background: "rgba(15, 23, 42, 0.5)",
                    color: "white",
                    fontSize: "0.9rem",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem" }}>Assign To</label>
                <select
                  value={newTask.assignedTo}
                  onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "6px",
                    border: "1px solid rgba(148, 163, 184, 0.3)",
                    background: "rgba(15, 23, 42, 0.5)",
                    color: "white",
                    fontSize: "0.9rem",
                  }}
                >
                  <option value="Dev Team">Dev Team</option>
                  <option value="Corporate Team">Corporate Team</option>
                  <option value="Outreach Team">Outreach Team</option>
                  <option value="All Team">All Team</option>
                </select>
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem" }}>Priority</label>
                <select
                  value={newTask.priority}
                  onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "6px",
                    border: "1px solid rgba(148, 163, 184, 0.3)",
                    background: "rgba(15, 23, 42, 0.5)",
                    color: "white",
                    fontSize: "0.9rem",
                  }}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              <button
                onClick={addTask}
                style={{
                  background: "linear-gradient(45deg, #3b82f6, #1d4ed8)",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  padding: isMobile ? "10px 20px" : "12px 24px",
                  fontSize: "1rem",
                  fontWeight: "500",
                  cursor: "pointer",
                  width: "100%",
                }}
              >
                Add Task
              </button>
            </div>
          )}

          {/* Team Tasks */}
          <div
            style={{
              background: "rgba(30, 41, 59, 0.6)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(148, 163, 184, 0.2)",
              borderRadius: "12px",
              padding: isMobile ? "1rem" : "1.5rem",
              gridColumn: userRole === "member" ? "1 / -1" : "auto",
            }}
          >
            <h3 style={{ margin: "0 0 1rem 0", fontSize: "1.1rem", fontWeight: "600" }}>Team Tasks</h3>

            <div style={{ maxHeight: isMobile ? "300px" : "400px", overflowY: "auto" }}>
              {tasks.length === 0 ? (
                <p style={{ color: "#94a3b8", textAlign: "center", margin: "2rem 0" }}>
                  No tasks yet. {userRole === "lead" ? "Create your first task!" : "Wait for tasks to be assigned."}
                </p>
              ) : (
                tasks.map((task) => (
                  <div
                    key={task.id}
                    style={{
                      background: "rgba(15, 23, 42, 0.5)",
                      border: "1px solid rgba(148, 163, 184, 0.2)",
                      borderRadius: "8px",
                      padding: isMobile ? "0.75rem" : "1rem",
                      marginBottom: "1rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: isMobile && windowWidth < 480 ? "column" : "row",
                        justifyContent: "space-between",
                        alignItems: isMobile && windowWidth < 480 ? "flex-start" : "flex-start",
                        marginBottom: "0.5rem",
                        gap: isMobile && windowWidth < 480 ? "0.5rem" : "0",
                      }}
                    >
                      <h4 style={{ margin: 0, fontSize: isMobile ? "0.9rem" : "1rem", fontWeight: "600" }}>
                        {task.title}
                      </h4>
                      <span
                        style={{
                          background: getPriorityColor(task.priority),
                          color: "white",
                          padding: "2px 8px",
                          borderRadius: "12px",
                          fontSize: "0.7rem",
                          fontWeight: "500",
                          alignSelf: isMobile && windowWidth < 480 ? "flex-start" : "auto",
                        }}
                      >
                        {task.priority}
                      </span>
                    </div>

                    <p style={{ margin: "0.5rem 0", color: "#cbd5e1", fontSize: isMobile ? "0.8rem" : "0.9rem" }}>
                      Assigned to: {task.assignedTo}
                    </p>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: isMobile ? "column" : "row",
                        justifyContent: "space-between",
                        alignItems: isMobile ? "flex-start" : "center",
                        marginTop: "1rem",
                        gap: isMobile ? "0.25rem" : "0",
                      }}
                    >
                      <span
                        style={{
                          color: getStatusColor(task.status),
                          fontSize: isMobile ? "0.8rem" : "0.9rem",
                          fontWeight: "500",
                        }}
                      >
                        Status: {task.status}
                      </span>
                      <p style={{ margin: 0, color: "#94a3b8", fontSize: isMobile ? "0.75rem" : "0.8rem" }}>
                        Created by: {task.createdBy}
                      </p>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "0.5rem",
                        marginTop: "1rem",
                      }}
                    >
                      {task.status !== "IN PROGRESS" && (
                        <button
                          onClick={() => updateTaskStatus(task.id, "IN PROGRESS")}
                          style={{
                            background: "#3b82f6",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            padding: isMobile ? "5px 10px" : "6px 12px",
                            fontSize: isMobile ? "0.75rem" : "0.8rem",
                            cursor: "pointer",
                          }}
                        >
                          Start
                        </button>
                      )}
                      {task.status !== "COMPLETED" && (
                        <button
                          onClick={() => updateTaskStatus(task.id, "COMPLETED")}
                          style={{
                            background: "#10b981",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            padding: isMobile ? "5px 10px" : "6px 12px",
                            fontSize: isMobile ? "0.75rem" : "0.8rem",
                            cursor: "pointer",
                          }}
                        >
                          Complete
                        </button>
                      )}
                      {userRole === "lead" && (
                        <button
                          onClick={() => deleteTask(task.id)}
                          style={{
                            background: "#ef4444",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            padding: isMobile ? "5px 10px" : "6px 12px",
                            fontSize: isMobile ? "0.75rem" : "0.8rem",
                            cursor: "pointer",
                          }}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Task Summary */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(3, 1fr)" : "repeat(3, 1fr)",
            gap: "1rem",
          }}
        >
          <div
            style={{
              background: "rgba(30, 41, 59, 0.6)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(148, 163, 184, 0.2)",
              borderRadius: "12px",
              padding: isMobile ? "1rem" : "1.5rem",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: isMobile ? "1.5rem" : "2rem",
                fontWeight: "700",
                color: "#f59e0b",
                marginBottom: "0.5rem",
              }}
            >
              {taskCounts.pending}
            </div>
            <div style={{ fontSize: isMobile ? "0.9rem" : "1rem", fontWeight: "500" }}>Pending Tasks</div>
          </div>

          <div
            style={{
              background: "rgba(30, 41, 59, 0.6)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(148, 163, 184, 0.2)",
              borderRadius: "12px",
              padding: isMobile ? "1rem" : "1.5rem",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: isMobile ? "1.5rem" : "2rem",
                fontWeight: "700",
                color: "#3b82f6",
                marginBottom: "0.5rem",
              }}
            >
              {taskCounts.inProgress}
            </div>
            <div style={{ fontSize: isMobile ? "0.9rem" : "1rem", fontWeight: "500" }}>In Progress</div>
          </div>

          <div
            style={{
              background: "rgba(30, 41, 59, 0.6)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(148, 163, 184, 0.2)",
              borderRadius: "12px",
              padding: isMobile ? "1rem" : "1.5rem",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: isMobile ? "1.5rem" : "2rem",
                fontWeight: "700",
                color: "#10b981",
                marginBottom: "0.5rem",
              }}
            >
              {taskCounts.completed}
            </div>
            <div style={{ fontSize: isMobile ? "0.9rem" : "1rem", fontWeight: "500" }}>Completed</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeamAssemble
