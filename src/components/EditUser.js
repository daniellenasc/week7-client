import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";
import api from "../api/api";

function EditUser({ form, setForm, reload, setReload }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await api.put("/user/edit", form);
      setShow(false);
      setReload(!reload);
    } catch (error) {
      console.error(error);
      alert("Algo deu errado!");
    }
  }

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Editar perfil
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar perfil</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Nome do Usuário</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditUser;
