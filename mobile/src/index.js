import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';

import api from './services/api';
/**
 * Não possuem valor semântico
 * 
 * View vai representar os containers: div, footer, header, main, aside, section
 */
export default function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('projects').then(response => {
      setProjects(response.data);
    });
  }, [] );

  async function handleAddProject() {
    const response = await api.post('projects', {
      title: `Novo projeto ${Date.now()}`,
      owner: 'Taka'
    });

    const project = response.data;

    setProjects([ ...projects, project]);
  }

  return (
    <>
      <StatusBar barStyle='light-content' backgroundColor='#7159C1'/>
      
      <SafeAreaView style={styles.container}>
        <FlatList
          data={projects}
          keyExtractor={project => project.id}
          renderItem={({ item: project}) => (
            <Text style={styles.project}>{project.title}</Text>
          )}
        />

        <TouchableOpacity 
          activeOpacity={0.6} 
          style={styles.button} 
          onPress={handleAddProject}
        >
          <Text style={styles.buttonText}>Adicionar Projeto</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7159C1',
  },

  project: {
    color: '#C6C6C6',
    fontSize: 25
  },

  button: {
    backgroundColor: '#C6C6C6',
    margin: 20,
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    fontWeight: 'bold',
    fontSize: 18
  }
});