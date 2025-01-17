import express from "express";
import User from "../models/User.model.js";

const router = express.Router();

// Rota de Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Preencha todos os campos!" });
  }

  try {
    // Verificar se o usuário existe no banco de dados
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado!" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Senha incorreta!" });
    }

    // Salvar o ID do usuário na sessão
    req.session.userId = user._id;

    res.status(200).json({ message: "Login bem-sucedido!", userId: user._id });
  } catch (err) {
    console.error("Erro:", err);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

router.post("/register", async (req, res) => {

  const user = req.body;

  if (!user.name || !user.email || !user.password) {
    return res.status(400).json({ message: "Preencha todos os campos!" })
  }

  if (user) {
    return res.status(400).json({ message: "Email já registrado" })
  }

  try {
    const newUser = new User(user);
    await newUser.save();
    res.status(201).json({ success: true, data: newUser });
  } catch (err) {
    res.status(500).json({ error: "Failed to create user", details: err.message });

  }
})

// Rota para verificar se o usuário está logado
router.get("/session", (req, res) => {
  if (req.session.userId) {
    res.status(200).json({ message: "Usuário logado", userId: req.session.userId });
  } else {
    res.status(401).json({ message: "Usuário não está logado" });
  }
});

router.post("/logout", (req, res) => {
  // Destroi a sessão
  req.session.destroy((err) => {
    if (err) {
      console.error("Erro ao encerrar a sessão:", err);
      return res.status(500).json({ message: "Erro ao encerrar a sessão" });
    }

    // Limpa o cookie da sessão no cliente
    res.clearCookie("connect.sid"); // Nome padrão do cookie do express-session
    res.status(200).json({ message: "Logout bem-sucedido!" });
  });
});

export default router;
