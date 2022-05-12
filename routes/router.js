const dotenv = require("dotenv");
const express = require("express");
const route = express.Router();
const cors = require("cors");
const { 
  loadJSON, 
  list_ids_of_ad_objects_without_nbt_platform_query_param, 
  create_advertisement_report, 
  create_advertisement_report_graph 
  } = require("../service/pinbook");



route.get("/advertisementList", (req, res) => {
  let json = list_ids_of_ad_objects_without_nbt_platform_query_param();
  res.send(json);
});

route.get("/advertisementReport", (req, res) => {
  let json = create_advertisement_report();
  res.send(json);
});

route.get("/advertisementReportGraph", (req, res) => {
  let graph = create_advertisement_report_graph();
  res.send(graph);
});



module.exports = route;