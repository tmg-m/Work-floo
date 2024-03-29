import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiService from "../services/api.service";
import '../css/edit.css'

function TaskEdit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    title: '',
    discription: '',
    hot: false,
    imgUrl: '',
  });

  const taskDb = async () => {
    try {
      const taskData = await apiService.getSingleTask(id)
      setForm({
        title: taskData.data.task.title,
        discription: taskData.data.task.discription,
        hot: taskData.data.task.hot,
        imgUrl: taskData.data.task.imgUrl,
      })
      
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    taskDb()
  }, []);

  const handleForm = (e) => {
    setForm((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      }
    })
  }

  const handleFormCheck = (e) => {
    setForm((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.checked,
      }
    })
  }

  const handleImgaeUpload = e => {
    const uploadData = new FormData();
    uploadData.append('imgUrl', e.target.files[0]);
    apiService
      .imgUpload(uploadData)
      .then(response => {
        setForm((prev) => {
          return {
            ...prev,
            imgUrl: response.data.cloudUrl
          }
        });
      })
      .catch(error => console.log(error));
  };

  const editMyTask = async () => {
    try {
      apiService.editTask(id, form)
      navigate(`/task/${id}`)
    } catch (error) {
      console.log(error);
    }
  }

  const deleteTask = async () => {
    apiService.deleteTask(id)
    navigate(`/`)
  }

  return (
    <>
      <div className="detail-container">
        <form className="edit-form-controller" onSubmit={editMyTask}>
          <div className="fomt-input">
              <label>Title</label>
              <input type="text" name="title" value={form.title} onChange={handleForm} />
            </div>
            <div className="fomt-input">
              <label>Discription</label>
              <input type="text" name="discription" value={form.discription} onChange={handleForm} />
            </div>
          <div className="high-priority flex-column flex-center">
              <label>Hot</label>
              <input type="checkbox" name="hot" checked={form.hot} onChange={handleFormCheck} />
            </div>
          <div className="upload-img">
              <label>Image</label>
              <input type="file" name="imgUrl" onChange={handleImgaeUpload} />
            </div>
            <button type="submit">save</button>
          </form>
          <button onClick={deleteTask} >Delete Task</button>
       </div>
    </>
  )
}

export default TaskEdit;
