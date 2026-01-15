// Clase para manejar la búsqueda
class RecipeSearch {
    constructor() {
        console.log(' RecipeSearch inicializando...');
        this.searchInput = document.getElementById('barraBusqueda');
        this.suggestionsContainer = document.getElementById('suggestionsContainer');
        console.log('Input encontrado:', !!this.searchInput);
        console.log('Container encontrado:', !!this.suggestionsContainer);
        if (this.searchInput && this.suggestionsContainer) {

            this.init();
        } else {
            console.error('No se encontraron elementos del buscador');
        }
    }

    init() {
        let timeoutId;
        console.log('Inicializando eventos de búsqueda...');
        
        // Evento para búsqueda en tiempo real
        this.searchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim();
            
            clearTimeout(timeoutId);
            
            if (query.length === 0) {
                 console.log('Query vacío, ocultando sugerencias');
                this.hideSuggestions();
                return;
            }
            
            // Debounce
            timeoutId = setTimeout(() => {
                console.log('Buscando:', query);
                this.search(query);
            }, 300);
        });
        
        // Tecla Enter
        this.searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.performSearch(this.searchInput.value.trim());
            }
            
            if (e.key === 'Escape') {
                this.hideSuggestions();
            }
        });
        
        // Cerrar sugerencias al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (!e.target.closest('search')) {
                this.hideSuggestions();
            }
        });
    }

    async search(query) {
        if (query.length < 2) {
            this.showMessage('Escribe al menos 2 caracteres');
            return;
        }

         let url;
        
        try {
            const response = await fetch(`/api/recipes/search/suggestions?q=${encodeURIComponent(query)}`);
            console.log('Haciendo petición a:', url);
            
            if (!response.ok) throw new Error('Error en la búsqueda');
            
            const data = await response.json();
            
            if (data.success && data.suggestions?.length > 0) {
                this.showSuggestions(data.suggestions);
            } else {
                this.showNoResults();
            }
            
        } catch (error) {
            console.error('Error:', error);
             console.error('URL de la petición:', url);
            this.showError();
        }
    }

    showSuggestions(suggestions) {
       this.suggestionsContainer.innerHTML = suggestions.map(recipe => `
        <div class="suggestion-item" data-id="${recipe.id}">
            <div class="suggestion-text">
                <strong>${this.escapeHtml(recipe.title)}</strong>
                ${recipe.category ? `<small>${this.escapeHtml(recipe.category)}</small>` : ''}
            </div>
        </div>
    `).join('');
        // Eventos de clic
        this.suggestionsContainer.querySelectorAll('.suggestion-item').forEach(item => {
            item.addEventListener('click', () => {
                window.location.href = `recipe.html?id=${item.dataset.id}`;
            });
        });
        
        this.showContainer();
    }

    showLoading() {
    this.suggestionsContainer.innerHTML = `
        <div class="suggestion-message">
            🔍 Buscando recetas...
        </div>
    `;
    this.showContainer();
}

showNoResults() {
    this.suggestionsContainer.innerHTML = `
        <div class="suggestion-message">
            No se encontraron recetas
        </div>
    `;
    this.showContainer();
}

showError() {
    this.suggestionsContainer.innerHTML = `
        <div class="suggestion-message">
            Error al buscar
        </div>
    `;
    this.showContainer();
}


    showMessage(message) {
        this.suggestionsContainer.innerHTML = `
            <div class="suggestion-message">
                <div class="suggestion-text">${message}</div>
            </div>
        `;
        this.showContainer();
    }

  


    showContainer() {
        this.suggestionsContainer.classList.add('active');
    }

    hideSuggestions() {
        this.suggestionsContainer.classList.remove('active');
    }

    performSearch(query) {
        if (query) {
            // Redirigir a página de resultados 
            console.log('Búsqueda completa:', query);
            this.hideSuggestions();
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new RecipeSearch();
});