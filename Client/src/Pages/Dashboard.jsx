import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { getAllProjectAPI, updateProjectAPI, deleteProjectAPI, addProjectAPI } from '../Services/allAPI';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

function Dashboard() {
  const navigate = useNavigate();
  const [allProjects, setAllProjects] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [editedProjectTitle, setEditedProjectTitle] = useState("");
  const [editedProjectDescription, setEditedProjectDescription] = useState("");
  const [newProjectTitle, setNewProjectTitle] = useState("");
  const [newProjectDescription, setNewProjectDescription] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    getAllProjects();
  }, []);

  const getAllProjects = async () => {
    try {
      const result = await getAllProjectAPI();
      if (result.status === 200) {
        setAllProjects(result.data.allProjects);
      } else if (result.response.status === 403) {
        toast.error('Unauthorized, please login');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (error) {
      toast.error('An error occurred while fetching projects');
    }
  };

  const handleProject = (projectId) => {
    navigate(`/task/${projectId}`);
  };

  const handleEdit = (project) => {
    setCurrentProject(project);
    setEditedProjectTitle(project.projectTitle || "");
    setEditedProjectDescription(project.projectDescription || "");
    setShowEditModal(true);
  };

  const handleDelete = (project) => {
    setCurrentProject(project);
    setShowDeleteModal(true);
  };

  const handleSaveEdit = async () => {
    const errors = validateEditForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    
    try {
      const result = await updateProjectAPI(currentProject._id, {
        projectTitle: editedProjectTitle,
        projectDescription: editedProjectDescription
      });
      if (result.status === 200) {
        toast.success('Project updated successfully');
        getAllProjects();
        setShowEditModal(false);
      } else {
        toast.error('Failed to update project');
      }
    } catch (error) {
      toast.error('An error occurred while updating the project');
    }
  };

  const handleConfirmDelete = async () => {
    try {
      const result = await deleteProjectAPI(currentProject._id);
      if (result.status === 200) {
        toast.success('Project deleted successfully');
        getAllProjects();
        setShowDeleteModal(false);
      } else {
        toast.error('Failed to delete project');
      }
    } catch (error) {
      toast.error('An error occurred while deleting the project');
    }
  };

  const handleAddProject = async () => {
    const errors = validateAddForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    try {
      const result = await addProjectAPI({
        projectTitle: newProjectTitle,
        projectDescription: newProjectDescription
      });
      if (result.status === 200) {
        toast.success('Project added successfully');
        getAllProjects();
        setShowAddModal(false);
      } else {
        toast.error('Failed to add project');
      }
    } catch (error) {
      toast.error('An error occurred while adding the project');
    }
  };

  const validateEditForm = () => {
    const errors = {};
    if (!editedProjectTitle) errors.title = 'Project title is required';
    if (!editedProjectDescription) errors.description = 'Project description is required';
    return errors;
  };

  const validateAddForm = () => {
    const errors = {};
    if (!newProjectTitle) errors.title = 'Project title is required';
    if (!newProjectDescription) errors.description = 'Project description is required';
    return errors;
  };

  return (
    <div className="container mt-4">
      <div className='flex justify-between'><Button className='btn btn-sm btn-success mb-2' onClick={() => setShowAddModal(true)}>Add New Project</Button>
      <div className='btn btn-outline-danger btn-sm'>{sessionStorage.getItem("username")}</div></div>
      <Row>
        {allProjects && allProjects.map((project, index) => {
          let completedTasks = project.task ? project.task.filter(task => task.status === true).length : 0;
          let totalTask = project.task ? project.task.length : 0;
          let date = project.createdAt.split("T")[0];

          return (
            <Col md={4} className="mb-3" key={index}>
              <Card style={{ width: '100%', height: '12rem' }}>
                <Card.Body key={project._id} onClick={() => handleProject(project._id)}>
                  <Card.Title className='font-extrabold'>{project.projectTitle}</Card.Title>
                  <Card.Subtitle className=" text-muted">
                    <div><span className='font-bold'>Summary </span>:{` ${completedTasks}/${totalTask}`} todos Completed</div>
                  </Card.Subtitle>
                  <Card.Text>
                    {project.projectDescription ? project.projectDescription : "No description"}
                  </Card.Text>
                </Card.Body>
                <div className='flex justify-between'>
                  <div className='text-end mx-3 mt-3 opacity-50'>{`${date}`}</div>
                  <div className='mx-2 mb-2'>
                    <Button variant='warning' className='mx-1 btn-sm' onClick={() => handleEdit(project)}>Edit</Button>
                    <Button variant='danger' className='btn-sm' onClick={() => handleDelete(project)}>Delete</Button>
                  </div>
                </div>
              </Card>
            </Col>
          );
        })}
      </Row>

      {/* Add Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNewProjectTitle">
              <Form.Label>Project Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter project title"
                value={newProjectTitle}
                onChange={(e) => setNewProjectTitle(e.target.value)}
                isInvalid={!!validationErrors.title}
              />
              <Form.Control.Feedback type="invalid">
                {validationErrors.title}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formNewProjectDescription">
              <Form.Label>Project Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter project description"
                value={newProjectDescription}
                onChange={(e) => setNewProjectDescription(e.target.value)}
                isInvalid={!!validationErrors.description}
              />
              <Form.Control.Feedback type="invalid">
                {validationErrors.description}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleAddProject}>Add Project</Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formProjectTitle">
              <Form.Label>Project Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter project title"
                value={editedProjectTitle}
                onChange={(e) => setEditedProjectTitle(e.target.value)}
                isInvalid={!!validationErrors.title}
              />
              <Form.Control.Feedback type="invalid">
                {validationErrors.title}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formProjectDescription">
              <Form.Label>Project Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter project description"
                value={editedProjectDescription}
                onChange={(e) => setEditedProjectDescription(e.target.value)}
                isInvalid={!!validationErrors.description}
              />
              <Form.Control.Feedback type="invalid">
                {validationErrors.description}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleSaveEdit}>Save Changes</Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this project?
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

export default Dashboard;
