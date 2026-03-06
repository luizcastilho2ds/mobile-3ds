import React, { useState, useEffect } from "react";
import { View, Image, Text } from "react-native";
import Cesta from "./src/telas/Cesta";


export default function App() {
 const [loading, setLoading] = useState(true);


 useEffect(() => {
   const timer = setTimeout(() => setLoading(false), 2000); // exibe splash por 2s
   return () => clearTimeout(timer);
 }, []);


 const itens = [
   { id: "1", nome: "Alface", imagem: "https://img.cdndsgni.com/preview/13206058.jpg"},
   { id: "2", nome: "Tomate", imagem: "https://img.cdndsgni.com/preview/10002716.jpg" },
   { id: "3", nome: "Cenoura", imagem: "https://img.cdndsgni.com/preview/12485137.jpg" },
   { id: "4", nome: "Batata", imagem: "https://img.cdndsgni.com/preview/10600699.jpg" },
 ];
// Enquanto o estado "loading" for verdadeiro, o app retorna a tela de splash.
// A tela mostra uma imagem (splash.png) e o título "Compras App" centralizados.
// Após o tempo definido no useEffect, "loading" se torna falso e app carrega a tela da Cesta.
 if (loading) {
   return (
     <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" }}>
       <Image source={require("./assets/splash.png")} style={{ width: 200, height: 200, resizeMode: "contain" }} />
       <Text style={{ marginTop: 20, fontSize: 18, fontWeight: "bold" }}>Compras App</Text>
     </View>
   );
 }
 return (
   <Cesta
     nome="Cesta de Verduras"
     fazenda="Fazenda Boa Terra"
     preco="R$ 40,00"
     imagemFazenda="https://images.creativefabrica.com/products/previews/2023/09/21/zflmFfpQ1/2arIMKaNH3p63xC93CBzRYqmF9Z-desktop.jpg"
     itens={itens}
   />
 );
}
