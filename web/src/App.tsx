import React, { useState, useEffect } from 'react';
import './App.css';
import { imoveisAPI, comodosAPI } from './services/api';

interface Imovel {
  id: number;
  descricao: string;
  dataCompra: string;
  endereco: string;
  comodos?: string[];
}

interface Comodo {
  id: number;
  nome: string;
  imovelId?: number;
}

function App() {
  const [imoveis, setImoveis] = useState<Imovel[]>([]);
  const [comodos, setComodos] = useState<Comodo[]>([]);
  const [loading, setLoading] = useState(false);
  const [showImovelModal, setShowImovelModal] = useState(false);
  const [showComodoModal, setShowComodoModal] = useState(false);
  const [showAddComodoModal, setShowAddComodoModal] = useState(false);
  const [showRemoveComodoModal, setShowRemoveComodoModal] = useState(false);
  const [editingImovel, setEditingImovel] = useState<Imovel | null>(null);
  const [editingComodo, setEditingComodo] = useState<Comodo | null>(null);
  const [imovelForm, setImovelForm] = useState({
    descricao: '',
    dataCompra: '',
    endereco: ''
  });
  const [comodoForm, setComodoForm] = useState({
    nome: ''
  });
  const [comodoImovelForm, setComodoImovelForm] = useState({
    imovelId: '',
    comodos: [] as number[]
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [imoveisResponse, comodosResponse] = await Promise.all([
        imoveisAPI.getAll(),
        comodosAPI.getAll()
      ]);
      setImoveis(imoveisResponse.data);
      setComodos(comodosResponse.data);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      alert('Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  };

  const handleImovelSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingImovel) {
        await imoveisAPI.update(editingImovel.id, imovelForm);
      } else {
        await imoveisAPI.create(imovelForm);
      }
      setShowImovelModal(false);
      setEditingImovel(null);
      setImovelForm({ descricao: '', dataCompra: '', endereco: '' });
      loadData();
    } catch (error) {
      console.error('Erro ao salvar imóvel:', error);
      alert('Erro ao salvar imóvel');
    }
  };

  const handleEditImovel = (imovel: Imovel) => {
    setEditingImovel(imovel);
    setImovelForm({
      descricao: imovel.descricao,
      dataCompra: imovel.dataCompra ? imovel.dataCompra.split('T')[0] : '',
      endereco: imovel.endereco
    });
    setShowImovelModal(true);
  };

  const handleDeleteImovel = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este imóvel?')) {
      try {
        await imoveisAPI.delete(id);
        loadData();
      } catch (error) {
        console.error('Erro ao excluir imóvel:', error);
        alert('Erro ao excluir imóvel');
      }
    }
  };

  const handleComodoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingComodo) {
        await comodosAPI.update(editingComodo.id, comodoForm);
      } else {
        await comodosAPI.create(comodoForm);
      }
      setShowComodoModal(false);
      setEditingComodo(null);
      setComodoForm({ nome: '' });
      loadData();
    } catch (error) {
      console.error('Erro ao salvar cômodo:', error);
      alert('Erro ao salvar cômodo');
    }
  };

  const handleEditComodo = (comodo: Comodo) => {
    setEditingComodo(comodo);
    setComodoForm({ nome: comodo.nome });
    setShowComodoModal(true);
  };

  const handleDeleteComodo = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este cômodo?')) {
      try {
        await comodosAPI.delete(id);
        loadData();
      } catch (error) {
        console.error('Erro ao excluir cômodo:', error);
        alert('Erro ao excluir cômodo');
      }
    }
  };

  const handleAddComodoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await imoveisAPI.addComodo(comodoImovelForm.imovelId, { comodos: comodoImovelForm.comodos });
      setShowAddComodoModal(false);
      setComodoImovelForm({ imovelId: '', comodos: [] });
      loadData();
    } catch (error) {
      console.error('Erro ao adicionar cômodos:', error);
      alert('Erro ao adicionar cômodos');
    }
  };

  const handleRemoveComodoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await imoveisAPI.removeComodo(comodoImovelForm.imovelId, { comodos: comodoImovelForm.comodos });
      setShowRemoveComodoModal(false);
      setComodoImovelForm({ imovelId: '', comodos: [] });
      loadData();
    } catch (error) {
      console.error('Erro ao remover cômodos:', error);
      alert('Erro ao remover cômodos');
    }
  };

  const toggleComodoSelection = (comodoId: number) => {
    setComodoImovelForm(prev => ({
      ...prev,
      comodos: prev.comodos.includes(comodoId)
        ? prev.comodos.filter(id => id !== comodoId)
        : [...prev.comodos, comodoId]
    }));
  };

	return (
    <div className="App">
      <header className="App-header">
        <h1>Sistema de Imobiliária</h1>
      </header>
      
      <main className="main-content">
        <div className="button-section">
          <button 
            className="btn btn-primary"
            onClick={() => {
              setEditingImovel(null);
              setImovelForm({ descricao: '', dataCompra: '', endereco: '' });
              setShowImovelModal(true);
            }}
          >
            Cadastrar Imóvel
          </button>
          
          <button 
            className="btn btn-primary"
            onClick={() => {
              setEditingComodo(null);
              setComodoForm({ nome: '' });
              setShowComodoModal(true);
            }}
          >
            Cadastrar Cômodo
          </button>
          
          <button 
            className="btn btn-secondary"
            onClick={() => {
              setComodoImovelForm({ imovelId: '', comodos: [] });
              setShowAddComodoModal(true);
            }}
          >
            Adicionar Cômodos a Imóvel
          </button>
          
          <button 
            className="btn btn-secondary"
            onClick={() => {
              setComodoImovelForm({ imovelId: '', comodos: [] });
              setShowRemoveComodoModal(true);
            }}
          >
            Remover Cômodos de Imóvel
          </button>
        </div>

        <div className="lists-section">
          <div className="list-container">
            <h2>Imóveis</h2>
            {loading ? (
              <p>Carregando...</p>
            ) : (
              <div className="list">
                {imoveis.map((imovel) => (
                  <div key={imovel.id} className="list-item">
                    <div className="item-content">
                      <h3>{imovel.descricao}</h3>
                      <p><strong>Endereço:</strong> {imovel.endereco}</p>
                      <p><strong>Data de Compra:</strong> {new Date(imovel.dataCompra).toLocaleDateString()}</p>
                      <p><strong>Cômodos:</strong> {imovel.comodos?.join(', ') || 'Nenhum'}</p>
                    </div>
                    <div className="item-actions">
                      <button 
                        className="btn btn-small btn-edit"
                        onClick={() => handleEditImovel(imovel)}
                      >
                        Editar
                      </button>
                      <button 
                        className="btn btn-small btn-delete"
                        onClick={() => handleDeleteImovel(imovel.id)}
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="list-container">
            <h2>Cômodos</h2>
            {loading ? (
              <p>Carregando...</p>
            ) : (
              <div className="list">
                {comodos.map((comodo) => (
                  <div key={comodo.id} className="list-item">
                    <div className="item-content">
                      <h3>{comodo.nome}</h3>
                      <p><strong>ID:</strong> {comodo.id}</p>
                      <p><strong>Imóvel:</strong> {comodo.imovelId || 'Não vinculado'}</p>
                    </div>
                    <div className="item-actions">
                      <button 
                        className="btn btn-small btn-edit"
                        onClick={() => handleEditComodo(comodo)}
                      >
                        Editar
                      </button>
                      <button 
                        className="btn btn-small btn-delete"
                        onClick={() => handleDeleteComodo(comodo.id)}
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {showImovelModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{editingImovel ? 'Editar Imóvel' : 'Cadastrar Imóvel'}</h2>
            <form onSubmit={handleImovelSubmit}>
              <div className="form-group">
                <label>Descrição:</label>
                <input
                  type="text"
                  value={imovelForm.descricao}
                  onChange={(e) => setImovelForm({...imovelForm, descricao: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Data de Compra:</label>
                <input
                  type="date"
                  value={imovelForm.dataCompra}
                  onChange={(e) => setImovelForm({...imovelForm, dataCompra: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Endereço:</label>
                <input
                  type="text"
                  value={imovelForm.endereco}
                  onChange={(e) => setImovelForm({...imovelForm, endereco: e.target.value})}
                  required
                />
              </div>
              <div className="modal-actions">
                <button type="submit" className="btn btn-primary">Salvar</button>
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setShowImovelModal(false)}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showComodoModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{editingComodo ? 'Editar Cômodo' : 'Cadastrar Cômodo'}</h2>
            <form onSubmit={handleComodoSubmit}>
              <div className="form-group">
                <label>Nome:</label>
                <input
                  type="text"
                  value={comodoForm.nome}
                  onChange={(e) => setComodoForm({...comodoForm, nome: e.target.value})}
                  required
                />
              </div>
              <div className="modal-actions">
                <button type="submit" className="btn btn-primary">Salvar</button>
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setShowComodoModal(false)}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showAddComodoModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Adicionar Cômodos a Imóvel</h2>
            <form onSubmit={handleAddComodoSubmit}>
              <div className="form-group">
                <label>Imóvel:</label>
                <select
                  value={comodoImovelForm.imovelId}
                  onChange={(e) => setComodoImovelForm({...comodoImovelForm, imovelId: e.target.value})}
                  required
                >
                  <option value="">Selecione um imóvel</option>
                  {imoveis.map((imovel) => (
                    <option key={imovel.id} value={imovel.id}>
                      {imovel.descricao} - {imovel.endereco}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Cômodos Disponíveis:</label>
                <div className="checkbox-list">
                  {comodos.filter((comodo) => !comodo.imovelId).map((comodo) => (
                    <label key={comodo.id} className="checkbox-item">
                      <input
                        type="checkbox"
                        checked={comodoImovelForm.comodos.includes(comodo.id)}
                        onChange={() => toggleComodoSelection(comodo.id)}
                      />
                      {comodo.nome}
                    </label>
                  ))}
                </div>
              </div>
              <div className="modal-actions">
                <button type="submit" className="btn btn-primary">Adicionar</button>
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setShowAddComodoModal(false)}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showRemoveComodoModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Remover Cômodos de Imóvel</h2>
            <form onSubmit={handleRemoveComodoSubmit}>
              <div className="form-group">
                <label>Imóvel:</label>
                <select
                  value={comodoImovelForm.imovelId}
                  onChange={(e) => setComodoImovelForm({...comodoImovelForm, imovelId: e.target.value, comodos: []})}
                  required
                >
                  <option value="">Selecione um imóvel</option>
                  {imoveis.map((imovel) => (
                    <option key={imovel.id} value={imovel.id}>
                      {imovel.descricao} - {imovel.endereco}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Cômodos do Imóvel:</label>
                <div className="checkbox-list">
                  {comodos.filter((comodo) => comodo.imovelId === parseInt(comodoImovelForm.imovelId)).map((comodo) => (
                    <label key={comodo.id} className="checkbox-item">
                      <input
                        type="checkbox"
                        checked={comodoImovelForm.comodos.includes(comodo.id)}
                        onChange={() => toggleComodoSelection(comodo.id)}
                      />
                      {comodo.nome}
                    </label>
                  ))}
                </div>
              </div>
              <div className="modal-actions">
                <button type="submit" className="btn btn-primary">Remover</button>
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setShowRemoveComodoModal(false)}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
