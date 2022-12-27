import { Button, Card, Container, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import api from "../api/api";

function TasksPage() {
  const [form, setForm] = useState({
    details: "",
    dateFin: "",
  });

  const [tasks, setTasks] = useState([]);

  const [reload, setReload] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await api.get("/task/my-tasks");
        setTasks(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchTasks();
  }, [reload]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await api.post("/task/create-task", form);
      setReload(!reload);
      setForm({ details: "", dateFin: "" });
    } catch (error) {
      console.error(error);
      alert("Algo deu errado na criação da tarefa!");
    }
  }

  async function handleSelect(e, idTask) {
    await api.put(`/task/edit/${idTask}`, { status: e.target.value });
  }

  async function handleDeleteTask(e, idTask) {
    await api.delete(`/task/delete/${idTask}`);
    setReload(!reload);
  }

  async function handleTaskComplete(e, idTask) {
    await api.put(`/task/complete/${idTask}`);
    setReload(!reload);
  }

  //console.log(form);
  //console.log(tasks);

  return (
    <div>
      {/* FORMULARIO */}
      <Container className="border rounded mt-3">
        <Form>
          <Form.Group className="mt-3">
            <Form.Label>Tarefa</Form.Label>
            <Form.Control
              type="text"
              placeholder="Adicione uma nova tarefa"
              name="details"
              value={form.details}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>Prazo</Form.Label>
            <Form.Control
              type="date"
              name="dateFin"
              value={form.dateFin}
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="primary" className="m-3" onClick={handleSubmit}>
            Salvar
          </Button>
        </Form>
      </Container>

      {/* TAREFAS CADASTRADAS */}
      <Container className="border rounded mt-3">
        <h1 className="mt-3">Tarefas</h1>
        {tasks.map((task) => {
          return (
            <Card key={task._id} className="m-4">
              <Card.Body>
                <p>{task.details}</p>

                {!task.complete && (
                  <Form.Select
                    defaultValue={form.status}
                    onChange={(e) => handleSelect(e, task._id)}
                  >
                    <option value="criada">Criada</option>
                    <option value="iniciada">Iniciada</option>
                    <option value="finalizando">Finalizando</option>
                  </Form.Select>
                )}
              </Card.Body>
              <Card.Footer>
                {task.complete ? (
                  <p>Finalizada em: {task.dateFin.slice(0, 10)}</p>
                ) : (
                  <p>Prazo: {task.dateFin.slice(0, 10)}</p>
                )}

                <Button
                  variant="success"
                  size="small"
                  className="me-2"
                  onClick={(e) => handleTaskComplete(e, task._id)}
                >
                  Tarefa concluída
                </Button>
                <Button
                  variant="danger"
                  size="small"
                  className="ms-2"
                  onClick={(e) => handleDeleteTask(e, task._id)}
                >
                  Excluir tarefa
                </Button>
              </Card.Footer>
            </Card>
          );
        })}
      </Container>
    </div>
  );
}

export default TasksPage;
