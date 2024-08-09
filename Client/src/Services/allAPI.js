import { commonAPI } from "./commonAPI";
import { serverUrl } from "./serverURL";

export const registerAPI = async (user) => {
    return await commonAPI("POST", `${serverUrl}/register`, user, '');
};
export const loginAPI = async (user) => {
    return await commonAPI("POST", `${serverUrl}/login`, user, '');
};
export const getAllProjectAPI = async () => {
    const token = sessionStorage.getItem("token");
    const headers = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
    };
    return await commonAPI('GET', `${serverUrl}/projects`, {}, headers);
};
export const  getAllTasksAPI = async(projectId)=>{
    const token = sessionStorage.getItem("token");
    const headers = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
    };
    return await commonAPI('GET', `${serverUrl}/task/${projectId}`, {}, headers);
}

export const deleteTaskAPI = async (projectId, taskId) => {
    const token = sessionStorage.getItem("token");
    const headers = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
    };
    try {
        const response = await commonAPI('DELETE', `${serverUrl}/delete-task/${projectId}/${taskId}`, {}, headers);
        return response;
    } catch (error) {
        console.error('Error deleting task:', error);
        throw error;
    }
};

export const updateTaskAPI = async (projectId, taskId, updatedTaskData) => {
    const token = sessionStorage.getItem("token");
    const headers = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
    };
    try {
        const response = await commonAPI('PATCH', `${serverUrl}/edit-task/${projectId}/${taskId}`, updatedTaskData, headers);
        return response;
    } catch (error) {
        console.error('Error updating task:', error);
        throw error;
    }
};
export const createTaskAPI = async (projectId, taskData) => {
    const token = sessionStorage.getItem("token");
    const headers = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
    };
    try {
        const response = await commonAPI('POST', `${serverUrl}/add-task/${projectId}`, taskData, headers);
        return response;
    } catch (error) {
        console.error('Error creating task:', error);
        throw error;
    }
};
export const addProjectAPI = async (newProjectData) => {
    const token = sessionStorage.getItem("token");
    const headers = {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    };
    try {
      const response = await commonAPI('POST', `${serverUrl}/add-project`, newProjectData, headers);
      return response;
    } catch (error) {
      console.error('Error adding project:', error);
      throw error;
    }
  };

export const updateProjectAPI = async (projectId, updatedProjectData) => {
    const token = sessionStorage.getItem("token");
    const headers = {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    };
    
    try {
      const response = await commonAPI('PUT', `${serverUrl}/edit-project/${projectId}`, updatedProjectData, headers);
      return response;
    } catch (error) {
      console.error('Error updating project:', error);
      throw error;
    }
  };
  

  export const deleteProjectAPI = async (projectId) => {
    const token = sessionStorage.getItem("token");
    const headers = {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    };

    try {
      const response = await commonAPI('DELETE', `${serverUrl}/delete-project/${projectId}`, {}, headers);
      return response;
    } catch (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  };