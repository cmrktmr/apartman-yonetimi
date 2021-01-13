//components
import TableSugCom from "./components/TableSugCom";
//router
import { useHistory } from "react-router-dom";
// ant design
import { Card, Col, Row, Button } from "antd";

function SugCom() {
  const history = useHistory();

  // go to new-sug-com page
  const newSugCom = () => {
    return history.push(`/new-sug-com`);
  };

  return (
    <Row>
      <Col xl={24} lg={24} md={24} sm={24} xs={24}>
        <Card bordered={true} className="sug_com_body">
          <Col
            xl={24}
            lg={24}
            md={24}
            sm={24}
            xs={24}
            className="sugcom_section"
          >
            <TableSugCom />

            <Button
            className="new_sug_com_button"
              type="primary"
              shape="round"
              size="large"
              onClick={newSugCom}
            >
              İSTEK veya ŞİKAYET EKLE
            </Button>
          </Col>
        </Card>
      </Col>
    </Row>
  );
}

export default SugCom;
