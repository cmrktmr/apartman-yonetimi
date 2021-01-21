import { useState, useEffect } from "react";
//ant design
import { Drawer, InputNumber, Tooltip, Button, Row, Col } from "antd";
// ant design icon
import { DeleteOutlined } from "@ant-design/icons";
//firebase
import db from "../../../firebase";
import ConfirmModal from "../../../components/ConfirmModal";

function MarketDrawer({ visible, setVisible, onClose, items, setItems }) {
  const [marketItems, setMarketItems] = useState(items);
  const [modalVisible, setModalVisible] = useState(false);
  let totalPrice = 0;

  useEffect(() => {
    setMarketItems(items);
  }, [items]);

  items.map((item) => (totalPrice += item.price * item.count));

  const onChange = (id, cnt) => {
    setItems(
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              count: cnt,
            }
          : item
      )
    );
  };

  const deleteItem = (id) => {
    const newList = items.filter((todo) => todo.id !== id);
    setItems(newList);
  };

  const orderList = (orderList) => {
    //order adding to database
    db.collection("users")
      .doc("903rfcO6sbX7hJISg1ND")
      .collection("orders")
      .add({
        ...orderList,
      })
      .then((e) => console.log("ürünler eklendi"))
      .catch((e) => console.error(e))
      .finally(() => {
        setVisible(false);
        setItems([]);
      });
  };

  const modalIsVisible = () => setModalVisible(!modalVisible);

  return (
    <>
      <Drawer
        title="Sepetim"
        placement="right"
        closable={true}
        onClose={onClose}
        visible={visible}
        key="right"
      >
        <>
          {marketItems.map((item, index) => (
            <>
              <Row className="marketdrawer_count" key={index}>
                <Col span={16}>{`${index + 1}. ${item.title}`}</Col>
                <Col span={6}>
                  <InputNumber
                    min={1}
                    max={10}
                    defaultValue={item.count}
                    value={item.count}
                    onChange={(cnt) => onChange(item.id, cnt)}
                    style={{ marginRight: 5, width: 70 }}
                  />
                </Col>
                <Col span={2}>
                  <Tooltip title="Sepetten çıkar">
                    <Button
                      type="text"
                      danger
                      shape="circle"
                      icon={<DeleteOutlined />}
                      onClick={() => deleteItem(item.id)}
                    />
                  </Tooltip>
                </Col>
              </Row>
              <Row>
                <Col span={16}></Col>
                <Col span={8}>{`Fiyat: ${item.count * item.price} ₺`}</Col>
              </Row>
              <hr />
            </>
          ))}
        </>
        {items.length > 0 && (
          <>
            <Row>
              <Col span={16}>
                <h4>{`Toplam ${marketItems.length} ürün`}</h4>
              </Col>
              <Col span={8}>
                <h4>{`Fiyat: ${totalPrice} ₺`}</h4>
              </Col>
            </Row>
            <Row className="marketdrawer_button">
              <Col span={24}>
                <Button
                  type="ghost"
                  shape="round "
                  size="medium"
                  style={{ backgroundColor: "#3dc410", color: "white" }}
                  onClick={() => modalIsVisible(true)}
                >
                  Siparişi Tamamla
                </Button>
              </Col>
            </Row>
          </>
        )}
        {items.length === 0 && (
          <p className="Market_drawer_sepet"> Henüz Sepete Ürün Eklemediniz!</p>
        )}
      </Drawer>
      <ConfirmModal
        modalVisible={modalVisible}
        modalIsVisible={modalIsVisible}
        confirmFunction={() => orderList(marketItems)}
      />
    </>
  );
}

export default MarketDrawer;
