import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, SafeAreaView, Platform } from 'react-native';
import { CheckBox } from '@rneui/themed';

export default function App() {
  // State for the list of tasks
  const [tasks, setTasks] = useState([
    { key: '1', description: 'Complete React Native project', completed: false },
    { key: '2', description: 'Study for the exam', completed: false },
    { key: '3', description: 'Go grocery shopping', completed: false }
  ]);

  // State for new task input
  const [newTask, setNewTask] = useState('');

  // Function to toggle task completion
  const toggleTaskCompletion = (taskKey) => {
    setTasks(tasks.map(task =>
      task.key === taskKey ? { ...task, completed: !task.completed } : task
    ));
  };

  // Function to add a new task
  const addTask = () => {
    if (newTask.trim() === '') return; // Prevent empty tasks
    const newTaskObject = {
      key: String(tasks.length + 1),
      description: newTask,
      completed: false
    };
    setTasks([...tasks, newTaskObject]);
    setNewTask(''); // Clear input after adding task
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>📌 TODO List</Text>

      {/* Input Field and Add Button */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter new task..."
          value={newTask}
          onChangeText={setNewTask}
        />
        <Button title="Add" onPress={addTask} />
      </View>

      {/* Task List using FlatList */}
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <CheckBox
              checked={item.completed}
              onPress={() => toggleTaskCompletion(item.key)}
            />
            <Text style={[styles.taskText, item.completed && styles.completedText]}>
              {item.description}
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginRight: 10,
    borderRadius: 5
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  taskText: {
    fontSize: 16
  },
  completedText: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    color: 'gray'
  }
});
