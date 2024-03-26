import { Col, Row, Button } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { DELETE_FROM_FAVOURITES } from "../redux/actions";

const Cart = () => {
  // qui dentro ci vanno gli hooks!
  const favElem = useSelector((state) => {
    return state.favourites.content; // abbiamo recuperato dallo state di Redux l'array dei libri nel carrello
  });
  // booksCart è l'array dei libri salvati nel carrello, memorizzati in Redux in { cart: { content: [] } }

  // mi genero la funzione dispatch()
  const dispatch = useDispatch();

  return (
    <Row>
      <Col sm={12}>
        <ul style={{ listStyle: "none" }}>
          {favElem.map((data, i) => (
            <li key={i} className="my-4">
              <Row>
                <Col>{data.company_name}</Col>
                <Col>{data.title}</Col>
                <Col>
                  <Button
                    variant="danger"
                    onClick={() => {
                      // da qui dentro dovremmo eliminare il libro selezionato dal carrello!
                      dispatch({
                        type: DELETE_FROM_FAVOURITES,
                        payload: i,
                      });
                    }}
                  >
                    <FaTrash />
                  </Button>
                </Col>
              </Row>
            </li>
          ))}
        </ul>
      </Col>
    </Row>
  );
};

export default Cart;
