import React from "react";
import { View, Text, FlatList, Image, Button } from "react-native";

const produtos = [
  { id: "1", nome: "Alface", categoria: "Hortaliça", preco: 5, imagem: "https://img.cdndsgni.com/preview/13206058.jpg" },
  { id: "2", nome: "Tomate", categoria: "Fruta", preco: 7, imagem: "https://img.cdndsgni.com/preview/10002716.jpg" },
  { id: "3", nome: "Cenoura", categoria: "Legume", preco: 4, imagem: "https://img.cdndsgni.com/preview/12485137.jpg" },
];

export default function Catalogo({ irParaCarrinho, adicionarAoCarrinho }) {
  return (
    <View style={{ flex: 1, padding: 60 }}>
      <Text style={{ fontSize: 22, marginBottom: 30 }}>Catálogo de Produtos</Text>
      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 15 }}>
            <Image source={{ uri: item.imagem }} style={{ width: 50, height: 50, marginRight: 10 }} />
            <Text>{item.nome} - {item.categoria} - R$ {item.preco},00</Text>
            <Button title="Adicionar" onPress={() => adicionarAoCarrinho(item)} />
          </View>
        )}
      />
      <Button title="Ir para Carrinho" onPress={irParaCarrinho} />
    </View>
  );
}



