import React, { Component } from 'react';
import Repo from './components/Repo';
import NewRepoModal from './components/NewRepoModal';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';

export default class App extends Component<{}> {
  state = {
    modalVisible: false,
    repos:[],
  };

async componentDidMount(){
  const repos = JSON.parse(await AsyncStorage.getItem('@github:repos')) || [];
  this.setState({repos});
}

_addRepository = async (text) => {
  const repoCall = await fetch(`http://api.github.com/repos/${text}`);
  const response = await repoCall.json();
  const repository = {
    id: response.id,
    thumbnail: response.owner.avatar_url,
    title: response.name,
    author: response.owner.login,
  };

  this.setState({
     modalVisible: false,
     repos: [
      ...this.state.repos,
      repository,
     ],
  });

  await AsyncStorage.setItem('@github:repos',JSON.stringify(this.state.repos));
};
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}> 
            <Text style={styles.headerText}> Consumindo Github </Text>
            <TouchableOpacity onPress={() => this.setState({modalVisible:true})}> 
              <Text style={styles.headerButton}>+</Text>
            </TouchableOpacity> 
        </View>
        <ScrollView contentContainerStyle={styles.repoList}>
          {this.state.repos.map(repo => 
            <Repo key={repo.id} style={styles.repo} data={repo}/>
          )}

        </ScrollView>
        <NewRepoModal 
          onCancel={() => this.setState({modalVisible:false})} 
          visible={this.state.modalVisible}
          onAdd={this._addRepository} 
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  header:{
    height: 50,
    paddingTop: 0,
    backgroundColor: '#FFF',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  headerText:{
    fontSize: 18,
    fontWeight: 'bold',
  },  
  repoList:{
    padding: 20,
  },
  headerButton:{
    fontWeight: 'bold',
    fontSize : 30,
    color: 'black',
  }
});
