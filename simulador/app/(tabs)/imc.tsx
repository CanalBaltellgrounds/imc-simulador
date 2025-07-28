// app/tabs/imc.tsx
import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Keyboard, View, Text, Modal, Pressable } from 'react-native';

export default function IMCScreen() {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [resultado, setResultado] = useState({
    imc: '',
    classificacao: '',
    descricao: ''
  });

  const calcularIMC = () => {
    Keyboard.dismiss();
    
    if (!peso || !altura) {
      alert('Por favor, preencha peso e altura');
      return;
    }

    const pesoNum = parseFloat(peso.replace(',', '.'));
    const alturaNum = parseFloat(altura.replace(',', '.'));

    if (isNaN(pesoNum) || isNaN(alturaNum) || alturaNum <= 0 || pesoNum <= 0) {
      alert('Valores inválidos. Use números positivos.');
      return;
    }

    const imc = pesoNum / (alturaNum * alturaNum);
    let classificacao = '';
    let descricao = '';

    if (imc < 18.5) {
      classificacao = "Abaixo do peso";
      descricao = "Procure um nutricionista para adequar sua alimentação";
    } else if (imc < 24.9) {
      classificacao = "Peso normal";
      descricao = "Parabéns! Mantenha hábitos saudáveis";
    } else if (imc < 29.9) {
      classificacao = "Sobrepeso";
      descricao = "Atenção! Considere aumentar a atividade física";
    } else if (imc < 34.9) {
      classificacao = "Obesidade grau I";
      descricao = "Recomendado acompanhamento médico";
    } else if (imc < 39.9) {
      classificacao = "Obesidade grau II";
      descricao = "Procure ajuda profissional urgente";
    } else {
      classificacao = "Obesidade grau III";
      descricao = "Procure ajuda profissional imediatamente";
    }

    setResultado({
      imc: imc.toFixed(2),
      classificacao,
      descricao
    });

    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calculadora de IMC</Text>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Peso (kg):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Ex: 70.5"
          placeholderTextColor="#999"
          value={peso}
          onChangeText={setPeso}
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Altura (m):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Ex: 1.75"
          placeholderTextColor="#999"
          value={altura}
          onChangeText={setAltura}
        />
      </View>
      
      <TouchableOpacity style={styles.button} onPress={calcularIMC}>
        <Text style={styles.buttonText}>Calcular IMC</Text>
      </TouchableOpacity>

      {/* Modal de Resultados */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Seu Resultado de IMC</Text>
            
            <View style={styles.resultContainer}>
              <Text style={styles.imcValue}>{resultado.imc}</Text>
              <Text style={styles.imcClassification}>{resultado.classificacao}</Text>
            </View>
            
            <Text style={styles.imcDescription}>{resultado.descricao}</Text>

            <View style={styles.table}>
              <View style={styles.tableRow}>
                <Text style={styles.tableHeader}>Classificação</Text>
                <Text style={styles.tableHeader}>IMC</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>Abaixo do peso</Text>
                <Text style={styles.tableCell}>{"< 18,5"}</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>Peso normal</Text>
                <Text style={styles.tableCell}>18,5 - 24,9</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>Sobrepeso</Text>
                <Text style={styles.tableCell}>25 - 29,9</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>Obesidade Grau I</Text>
                <Text style={styles.tableCell}>30 - 34,9</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>Obesidade Grau II</Text>
                <Text style={styles.tableCell}>35 - 39,9</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>Obesidade Grau III</Text>
                <Text style={styles.tableCell}>{">= 40"}</Text>
              </View>
            </View>

            <Pressable
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Fechar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#4285f4',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  // Estilos do Modal
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  resultContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imcValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#4285f4',
  },
  imcClassification: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginTop: 5,
  },
  imcDescription: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  table: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    padding: 10,
  },
  tableHeader: {
    flex: 1,
    fontWeight: 'bold',
    color: '#333',
  },
  tableCell: {
    flex: 1,
    color: '#555',
  },
  closeButton: {
    backgroundColor: '#4285f4',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});