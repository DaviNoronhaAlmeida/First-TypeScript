import express from "express";
import { Router } from "express";
import { v4 as uuidv4 } from "uuid";

const app = express();
const PORT = 8000;
const router = Router();

app.use(express.static("public"));
app.use(express.json());
app.use(router);

app.listen(PORT);

router.post("/accounts/", cadastro);
router.post("/accounts/login", login);
router.patch("/accounts/", info);

function cadastro(req, res) {
    const { password, name, email } = req.body;
    const myuuid = uuidv4();
    const data = { id: myuuid, name: name, email: email };
    res.status(200).send(data);
}

function login(req, res) {
    const { password, email } = req.body;
    const myuuid = uuidv4();
    res.status(200).send(myuuid);
}

function info(req, res) {
    const { password, name, email } = req.body;
    const myuuid = uuidv4();
    const data = { id: myuuid, name: name, email: email };
    res.status(200).send(data);
}
