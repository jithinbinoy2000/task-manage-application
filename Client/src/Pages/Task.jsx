import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Form, Modal, Button } from 'react-bootstrap';
import { getAllTasksAPI, deleteTaskAPI, updateTaskAPI, createTaskAPI } from '../Services/allAPI';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

function Task() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [editedTaskName, setEditedTaskName] = useState("");
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [numTotalTasks, setNumTotalTasks] = useState(0);
  const [numCompletedTask, setNumCompletedTask] = useState(0);

  useEffect(() => {
    getAllTasks();
  }, [projectId]);

  useEffect(() => {
    setNumTotalTasks(tasks.length);
    setNumCompletedTask(tasks.filter(task => task.status).length);
  }, [tasks]);

  const getAllTasks = async () => {
    try {
      const result = await getAllTasksAPI(projectId);
      if (result.status === 200) {
        setTasks(result.data.tasks);
      } else if (result.response.status === 403) {
        toast.error('Unauthorized, please login');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (error) {
      toast.error('An error occurred while fetching tasks');
    }
  };

  const handleChange = async (e, taskId) => {
    const newStatus = e.target.checked;
    try {
      const result = await updateTaskAPI(projectId, taskId, { status: newStatus });
      if (result.status === 200) {
        toast.success('Task status updated');
        getAllTasks();
      } else {
        toast.error('Failed to update task status');
      }
    } catch (error) {
      toast.error('An error occurred while updating task status');
    }
  };

  const handleEdit = (task) => {
    setCurrentTask(task);
    setEditedTaskName(task.taskName || "");
    setShowEditModal(true);
  };

  const handleDelete = (task) => {
    setCurrentTask(task);
    setShowDeleteModal(true);
  };

  const handleSaveEdit = async () => {
    try {
      const result = await updateTaskAPI(projectId, currentTask._id, { taskName: editedTaskName });
      if (result.status === 200) {
        toast.success('Task updated');
        getAllTasks();
        setShowEditModal(false);
      } else {
        toast.error('Failed to update task');
      }
    } catch (error) {
      toast.error('An error occurred while updating task');
    }
  };

  const handleConfirmDelete = async () => {
    try {
      const result = await deleteTaskAPI(projectId, currentTask._id);
      if (result.status === 200) {
        toast.success('Task deleted');
        getAllTasks();
        setShowDeleteModal(false);
      } else {
        toast.error('Failed to delete task');
      }
    } catch (error) {
      toast.error('An error occurred while deleting task');
    }
  };

  const handleCreateTask = async () => {
    try {
      const result = await createTaskAPI(projectId, { taskName: newTaskName, taskDescription: newTaskDescription });
      if (result.status === 200) {
        toast.success('Task created');
        getAllTasks();
        setShowCreateModal(false);
        setNewTaskName("");
        setNewTaskDescription("");
      } else {
        toast.error('Failed to create task');
      }
    } catch (error) {
      toast.error('An error occurred while creating task');
    }
  };

  const completedTasks = tasks.filter(task => task.status);
  const pendingTasks = tasks.filter(task => !task.status);

  return (
    <div className="container mt-4">
      <div className='flex justify-between mb-3'>
        <div><span className='font-bold'>Summary</span> : {numCompletedTask}/{numTotalTasks} todos completed</div>
        <div>
          <a className='btn btn-dark btn-sm me-2' href="/dashboard">Back</a>
          <Button className="btn btn-success btn-sm" onClick={() => setShowCreateModal(true)}>Add New Task</Button>
        </div>
      </div>
      <Row>
        <Col md={12}>
          <h3 className='font-bold underline text-green-600 mb-2'>Completed Tasks</h3>
          {completedTasks.length > 0 ? completedTasks.map((task, index) => {
            const date = task.createdAt.split("T")[0];
            return (
              <Col md={4} className="mb-3" key={index}>
                <Card style={{ width: '100%', height: '8rem' }}>
                  <Card.Header className='flex justify-between'>
                    <div className="font-bold">{task.taskName}</div>
                    <Form>
                      <Form.Check
                        type="switch"
                        id={`completed-switch-${task._id}`}
                        checked={true}
                        onChange={(e) => handleChange(e, task._id)}
                      />
                    </Form>
                  </Card.Header>
                  <Card.Body>
                    <div>Description: {task.taskDescription || "No description"}</div>
                    <div className='flex justify-between'>
                      <div>Date: {date}</div>
                      <div>
                        <Button variant='warning' className='mx-1 btn-sm' onClick={() => handleEdit(task)}>Edit</Button>
                        <Button variant='danger' className='btn-sm' onClick={() => handleDelete(task)}>Delete</Button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          }) : <p>No completed tasks</p>}
        </Col>

        <Col md={12}>
          <h3 className='font-bold underline text-red-600 mb-3'>Pending Tasks</h3>
          {pendingTasks.length > 0 ? pendingTasks.map((task, index) => {
            const date = task.createdAt.split("T")[0];
            return (
              <Col md={4} className="mb-3" key={index}>
                <Card style={{ width: '100%', height: '8rem' }}>
                  <Card.Header className='flex justify-between'>
                    <div className="font-bold">{task.taskName}</div>
                    <Form>
                      <Form.Check
                        type="switch"
                        id={`pending-switch-${task._id}`}
                        checked={task.status}
                        onChange={(e) => handleChange(e, task._id)}
                      />
                    </Form>
                  </Card.Header>
                  <Card.Body>
                    <div>Description: {task.taskDescription || "No description"}</div>
                    <div className='flex justify-between'>
                      <div>Date: {date}</div>
                      <div>
                        <Button variant='warning' className='mx-1 btn-sm' onClick={() => handleEdit(task)}>Edit</Button>
                        <Button variant='danger' className='btn-sm' onClick={() => handleDelete(task)}>Delete</Button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          }) : <p>No pending tasks</p>}
        </Col>
      </Row>

      {/* Create Task Modal */}
      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNewTaskName">
              <Form.Label>Task Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter task name"
                value={newTaskName}
                onChange={(e) => setNewTaskName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formNewTaskDescription">
              <Form.Label>Task Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter task description"
                value={newTaskDescription}
                onChange={(e) => setNewTaskDescription(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCreateModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleCreateTask}>Create Task</Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Task Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTaskName">
              <Form.Label>Task Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter task name"
                value={editedTaskName}
                onChange={(e) => setEditedTaskName(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleSaveEdit}>Save Changes</Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Task Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this task?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleConfirmDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer />
    </div>
  );
}

export default Task;
