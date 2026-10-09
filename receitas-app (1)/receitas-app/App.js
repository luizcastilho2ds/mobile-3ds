
import React, { useState } from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  Modal,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert
} from 'react-native';

export default function App() {
  const [verReceitaVisivel, setVerReceitaVisivel] = useState(false);
  const [adicionarReceitaVisivel, setAdicionarReceitaVisivel] = useState(false);

  const [nomeReceita, setNomeReceita] = useState('');
  const [ingredientes, setIngredientes] = useState('');
  const [modoPreparo, setModoPreparo] = useState('');

  // null = nova receita; ID = receita em edição
  const [idEdicao, setIdEdicao] = useState(null);

  const [receitaSelecionada, setReceitaSelecionada] = useState(null);

  const [listaReceitas, setListaReceitas] = useState([
    {
      id: '1',
      nome: 'Macarrão ao Molho de Tomate',
      ingredientes:
        '250 g de macarrão\n3 tomates maduros\n2 dentes de alho\n1 colher de azeite\nSal, pimenta e manjericão a gosto',
      preparo:
        '1. Cozinhe o macarrão em água fervente com sal.\n\n2. Aqueça o azeite e refogue o alho.\n\n3. Adicione os tomates picados, tempere e cozinhe por 15 minutos.\n\n4. Misture o molho ao macarrão.\n\n5. Finalize com manjericão e sirva.'
    }
  ]);

  // Limpa os campos e fecha o formulário
  function limparEFechar() {
    setNomeReceita('');
    setIngredientes('');
    setModoPreparo('');
    setIdEdicao(null);
    setAdicionarReceitaVisivel(false);
  }

  // Abre o formulário para cadastrar uma nova receita
  function handleIniciarCadastro() {
    setNomeReceita('');
    setIngredientes('');
    setModoPreparo('');
    setIdEdicao(null);
    setAdicionarReceitaVisivel(true);
  }

  // Carrega os dados da receita para edição
  function handleIniciarEdicao(receita) {
    setNomeReceita(receita.nome);
    setIngredientes(receita.ingredientes);
    setModoPreparo(receita.preparo);
    setIdEdicao(receita.id);

    // Fecha a visualização antes de abrir o formulário
    setVerReceitaVisivel(false);
    setAdicionarReceitaVisivel(true);
  }

  // Salva uma nova receita ou atualiza uma existente
  function handleSalvar() {
    if (
      !nomeReceita.trim() ||
      !ingredientes.trim() ||
      !modoPreparo.trim()
    ) {
      Alert.alert(
        'Campos obrigatórios',
        'Preencha o nome, os ingredientes e o modo de preparo.'
      );
      return;
    }

    if (idEdicao !== null) {
      // Atualiza a receita existente usando map()
      setListaReceitas((listaAtual) =>
        listaAtual.map((item) =>
          item.id === idEdicao
            ? {
                ...item,
                nome: nomeReceita.trim(),
                ingredientes: ingredientes.trim(),
                preparo: modoPreparo.trim()
              }
            : item
        )
      );

      // Atualiza os dados da receita selecionada, se necessário
      setReceitaSelecionada((receitaAtual) =>
        receitaAtual && receitaAtual.id === idEdicao
          ? {
              ...receitaAtual,
              nome: nomeReceita.trim(),
              ingredientes: ingredientes.trim(),
              preparo: modoPreparo.trim()
            }
          : receitaAtual
      );

      limparEFechar();

      Alert.alert('Sucesso!', 'Receita atualizada com sucesso!');
    } else {
      // Cadastra uma nova receita
      const novaReceita = {
        id: Date.now().toString(),
        nome: nomeReceita.trim(),
        ingredientes: ingredientes.trim(),
        preparo: modoPreparo.trim()
      };

      setListaReceitas((listaAtual) => [
        ...listaAtual,
        novaReceita
      ]);

      limparEFechar();

      Alert.alert('Sucesso!', 'Receita cadastrada com sucesso!');
    }
  }

  // Exclui uma receita após confirmação
  function handleExcluir(id) {
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza que deseja excluir esta receita?',
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            setListaReceitas((listaAtual) =>
              listaAtual.filter((item) => item.id !== id)
            );

            if (receitaSelecionada && receitaSelecionada.id === id) {
              setVerReceitaVisivel(false);
              setReceitaSelecionada(null);
            }

            if (idEdicao === id) {
              limparEFechar();
            }

            Alert.alert('Sucesso!', 'Receita excluída com sucesso!');
          }
        }
      ]
    );
  }

  function abrirReceita(receita) {
    setReceitaSelecionada(receita);
    setVerReceitaVisivel(true);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🍲 App de Receitas</Text>

      <Text style={styles.subtitle}>
        Colecione suas receitas preferidas
      </Text>

      {/* Lista principal de receitas */}
      <FlatList
        style={styles.recipeList}
        contentContainerStyle={styles.recipeListContent}
        data={listaReceitas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.recipeCard}>
            <Text style={styles.cardTitle}>
              🍽️ {item.nome}
            </Text>

            <View style={styles.cardButtons}>
              <View style={styles.cardButton}>
                <Button
                  title="Ver Receita"
                  onPress={() => abrirReceita(item)}
                  color="#D97706"
                />
              </View>

              <View style={styles.cardButton}>
                <Button
                  title="Editar"
                  onPress={() => handleIniciarEdicao(item)}
                  color="#356859"
                />
              </View>

              <View style={styles.cardButton}>
                <Button
                  title="Excluir"
                  onPress={() => handleExcluir(item.id)}
                  color="#B91C1C"
                />
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              📖 Nenhuma receita cadastrada.
              {'\n'}
              Toque no + para adicionar!
            </Text>
          </View>
        }
      />

      {/* Modal para visualizar uma receita */}
      <Modal
        visible={verReceitaVisivel}
        animationType="slide"
        onRequestClose={() => setVerReceitaVisivel(false)}
      >
        <FlatList
          data={[]}
          renderItem={null}
          ListHeaderComponent={
            <View>
              {receitaSelecionada && (
                <>
                  <Text style={styles.recipeTitle}>
                    🍝 {receitaSelecionada.nome}
                  </Text>

                  <Text style={styles.sectionTitle}>
                    🥕 Ingredientes
                  </Text>

                  <Text style={styles.recipeText}>
                    {receitaSelecionada.ingredientes}
                  </Text>

                  <Text style={styles.sectionTitle}>
                    👨‍🍳 Modo de Preparo
                  </Text>

                  <Text style={styles.recipeText}>
                    {receitaSelecionada.preparo}
                  </Text>

                  <View style={styles.closeButton}>
                    <Button
                      title="Editar Receita"
                      color="#356859"
                      onPress={() =>
                        handleIniciarEdicao(receitaSelecionada)
                      }
                    />
                  </View>

                  <View style={styles.closeButton}>
                    <Button
                      title="Excluir Receita"
                      color="#B91C1C"
                      onPress={() =>
                        handleExcluir(receitaSelecionada.id)
                      }
                    />
                  </View>
                </>
              )}

              <View style={styles.closeButton}>
                <Button
                  title="Fechar Receita"
                  onPress={() => setVerReceitaVisivel(false)}
                  color="#D97706"
                />
              </View>
            </View>
          }
          contentContainerStyle={styles.modalContainer}
        />
      </Modal>

      {/* Modal para cadastrar ou editar uma receita */}
      <Modal
        visible={adicionarReceitaVisivel}
        animationType="slide"
        onRequestClose={limparEFechar}
      >
        <FlatList
          data={[]}
          renderItem={null}
          keyboardShouldPersistTaps="handled"
          ListHeaderComponent={
            <View>
              <Text style={styles.recipeTitle}>
                {idEdicao !== null
                  ? '✏️ Editar Receita'
                  : '📝 Cadastrar Receita'}
              </Text>

              <Text style={styles.inputLabel}>
                Nome da Receita
              </Text>

              <TextInput
                style={styles.input}
                placeholder="Ex.: Bolo de Cenoura"
                placeholderTextColor="#9A887D"
                value={nomeReceita}
                onChangeText={setNomeReceita}
              />

              <Text style={styles.inputLabel}>
                Ingredientes
              </Text>

              <TextInput
                style={[styles.input, styles.multilineInput]}
                placeholder="Digite os ingredientes..."
                placeholderTextColor="#9A887D"
                value={ingredientes}
                onChangeText={setIngredientes}
                multiline={true}
                textAlignVertical="top"
              />

              <Text style={styles.inputLabel}>
                Modo de Preparo
              </Text>

              <TextInput
                style={[styles.input, styles.multilineInput]}
                placeholder="Descreva o passo a passo..."
                placeholderTextColor="#9A887D"
                value={modoPreparo}
                onChangeText={setModoPreparo}
                multiline={true}
                textAlignVertical="top"
              />

              <View style={styles.formButton}>
                <Button
                  title={idEdicao !== null ? 'Salvar Alterações' : 'Salvar Receita'}
                  onPress={handleSalvar}
                  color="#356859"
                />
              </View>

              <View style={styles.formButton}>
                <Button
                  title="Cancelar"
                  onPress={limparEFechar}
                  color="#D97706"
                />
              </View>
            </View>
          }
          contentContainerStyle={styles.modalContainer}
        />
      </Modal>

      {/* Botão flutuante para adicionar receita */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={handleIniciarCadastro}
        activeOpacity={0.7}
        accessibilityLabel="Adicionar receita"
        accessibilityRole="button"
      >
        <Text style={styles.plusText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8E7',
    paddingTop: 55,
    paddingHorizontal: 20
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#356859',
    textAlign: 'center',
    marginBottom: 12
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#795548',
    textAlign: 'center',
    marginBottom: 20
  },
  recipeList: {
    flex: 1,
    width: '100%'
  },
  recipeListContent: {
    paddingBottom: 100,
    flexGrow: 1
  },
  recipeCard: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    marginBottom: 15,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E8DCC8',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.12,
    shadowRadius: 4
  },
  cardTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#356859',
    marginBottom: 15
  },
  cardButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8
  },
  cardButton: {
    flex: 1
  },
  modalContainer: {
    flexGrow: 1,
    backgroundColor: '#FFF8E7',
    padding: 25,
    paddingTop: 45
  },
  recipeTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#356859',
    textAlign: 'center',
    marginBottom: 25
  },
  sectionTitle: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#D97706',
    marginTop: 10,
    marginBottom: 12
  },
  recipeText: {
    fontSize: 17,
    fontWeight: '400',
    color: '#795548',
    lineHeight: 27,
    marginBottom: 20
  },
  closeButton: {
    marginTop: 15,
    marginBottom: 15
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#356859',
    marginBottom: 8,
    marginTop: 10
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D9CBB8',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    color: '#795548',
    marginBottom: 15
  },
  multilineInput: {
    minHeight: 110
  },
  formButton: {
    marginTop: 8,
    marginBottom: 8
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    marginTop: 40
  },
  emptyText: {
    fontSize: 17,
    color: '#795548',
    textAlign: 'center',
    lineHeight: 27
  },
  floatingButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#356859',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.3,
    shadowRadius: 4
  },
  plusText: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 40
  }
});