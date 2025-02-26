import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, Button, TouchableOpacity, ImageBackground, StyleSheet, ScrollView } from 'react-native';

const App = () => {
  const [user, setUser] = useState(null);
  const [produto, setProduto] = useState('');
  const [produtosAdicionados, setProdutosAdicionados] = useState([]); // Novo estado para os produtos adicionados
  const [feirantes, setFeirantes] = useState([
    { 
      id: '1', 
      nome: 'Feira Canto da Ilha', 
      contato: '(48) 3028-9257', 
      produtos: ['Orgânicos', 'Bazar', 'Brechós', 'Almoço', 'Artesanatos'], 
      imagem: 'https://via.placeholder.com/400x200?text=Feira+Canto+da+Ilha', 
      fundo: '#007bff' // Azul
    },
    { 
      id: '2', 
      nome: 'Ecofeira da Lagoa', 
      contato: '@ecofeira_lagoa', 
      produtos: ['Verduras', 'Padaria','Almoço','Artesanato','Variedades'], 
      imagem: 'https://via.placeholder.com/400x200?text=Ecofeira+da+Lagoa', 
      fundo: '#f4c542' // Amarelo
    },
  ]);
  const [clientes, setClientes] = useState([
    { id: '1', nome: 'Christopher Martins', contato: '(48) 9 9684-4731)' },
    { id: '2', nome: 'Sanderson José', contato: '(48) 9 9690-4729' }
  ]);

  const login = () => {
    setUser({ nome: 'Usuário', tipo: 'cliente' });
  };

  const adicionarProduto = () => {
    if (produto.trim()) {
      // Identificar qual feirante já tem esse produto
      const feiranteComProduto = feirantes.find(feirante => 
        feirante.produtos.some(p => p.toLowerCase().includes(produto.toLowerCase()))
      );

      if (feiranteComProduto) {
        // Se encontrar um feirante com o produto, adiciona
        const updatedFeirantes = feirantes.map(feirante =>
          feirante.id === feiranteComProduto.id
            ? { ...feirante, produtos: [...feirante.produtos, produto] }
            : feirante
        );
        setFeirantes(updatedFeirantes);
        
        // Adiciona o produto na lista de produtos adicionados manualmente
        setProdutosAdicionados([...produtosAdicionados, { nome: produto, feirante: feiranteComProduto.nome }]);
        setProduto(''); // Limpar o campo de entrada
      } else {
        alert('Nenhum feirante possui esse tipo de produto.');
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      {!user ? (
        <View style={styles.loginContainer}>
          <Text style={styles.header}>Feira Digital</Text>
          <TouchableOpacity onPress={login} style={styles.button}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <Text style={styles.header}>Bem-vindo, {user.nome}!</Text>
          <Text style={styles.subHeader}>Feirantes</Text>
          <FlatList
            data={feirantes}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <ImageBackground source={{ uri: item.imagem }} style={[styles.imageBackground, { backgroundColor: item.fundo }]}>
                <View style={styles.card}>
                  <Text style={styles.title}>{item.nome}</Text>
                  <Text style={styles.text}>Contato: {item.contato}</Text>
                  <Text style={styles.text}>Produtos: {item.produtos.join(', ')}</Text>
                </View>
              </ImageBackground>
            )}
          />
          
          {/* Input e botão para adicionar produto */}
          <TextInput
            placeholder="Digite um produto"
            value={produto}
            onChangeText={setProduto}
            style={styles.input}
          />
          <Button title="Adicionar Produto" onPress={adicionarProduto} color="#28a745" />

          {/* Exibição dos produtos adicionados */}
          <View style={styles.productsContainer}>
            <Text style={styles.subHeader}>Produtos Adicionados</Text>
            <FlatList
              data={produtosAdicionados} // Agora mostra apenas os produtos que foram adicionados manualmente
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.productCard}>
                  <Text style={styles.text}>{item.nome} (Feirante: {item.feirante})</Text>
                </View>
              )}
            />
          </View>

          <Text style={styles.subHeader}>Clientes</Text>
          <FlatList
            data={clientes}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={styles.cardClient}>
                <Text style={styles.title}>{item.nome}</Text>
                <Text style={styles.text}>Contato: {item.contato}</Text>
              </View>
            )}
          />
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa'
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#343a40'
  },
  subHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#343a40'
  },
  imageBackground: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  card: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background for readability
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  cardClient: {
    backgroundColor: 'rgba(0, 128, 0, 0.5)', // Verde para os clientes
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
  },
  text: {
    fontSize: 14,
    color: 'white'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ced4da',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: 'white'
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  productsContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  productCard: {
    backgroundColor: '#28a745',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    alignItems: 'center',
  }
});

export default App;
