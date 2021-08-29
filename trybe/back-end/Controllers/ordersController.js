const { Router } = require('express');

// const ordersService = require('../Service/ordersService');

const service = require('../Service/detailService');

const orders = Router();

orders.get('/', async (req, res) => {
  try {
    const { id } = req.payload;
    // console.log('id order controler ==>', id);
    const ordersProducts = await service.getOrders(id);
    res.status(200).json(ordersProducts);
  } catch (error) {
    console.error(error);
    // res.status(500).json({ message: 'Algo deu errado.' });
    res.status(500).json({ message: error });
  }
});

orders.get('/:id', async (req, res) => {
  try {
    // const { id } = req.payload;
    const { id } = req.params;
    const detailProducts = await service.getDetails(id);
    res.status(200).json(detailProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Algo deu errado.' });
  }
});

module.exports = orders;
