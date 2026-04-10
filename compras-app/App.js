import React, { useState, useEffect } from "react";
import { View, Image, Text } from "react-native";
import Login from "./src/telas/Login";
import Cadastro from "./src/telas/Cadastro";
import Catalogo from "./src/telas/Catalogo";
import Carrinho from "./src/telas/Carrinho";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [telaAtual, setTelaAtual] = useState("Login");
  const [carrinho, setCarrinho] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const adicionarAoCarrinho = (item) => setCarrinho([...carrinho, item]);

  if (loading) {
    return (
      <View style={{ flex:1, justifyContent:"center", alignItems:"center", backgroundColor:"#fff" }}>
        <Image source={require("./assets/splash.png")} style={{ width:200, height:200, resizeMode:"contain" }} />
        <Text style={{ marginTop:20, fontSize:18, fontWeight:"bold" }}>Compras App</Text>
      </View>
    );
  }

  if (telaAtual === "Login") {
    return (
      <Login
        irParaCatalogo={() => setTelaAtual("Catalogo")}
        irParaCadastro={() => setTelaAtual("Cadastro")}
      />
    );
  }

  if (telaAtual === "Cadastro") {
    return <Cadastro voltar={() => setTelaAtual("Login")} />;
  }

  if (telaAtual === "Catalogo") {
    return <Catalogo irParaCarrinho={() => setTelaAtual("Carrinho")} adicionarAoCarrinho={adicionarAoCarrinho} />;
  }

  if (telaAtual === "Carrinho") {
    return <Carrinho itens={carrinho} voltarCatalogo={() => setTelaAtual("Catalogo")} />;
  }

  return null;
}


