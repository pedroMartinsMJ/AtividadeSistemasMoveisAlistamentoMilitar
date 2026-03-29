// Alistamento Militar - Main JavaScript

// ============================================
// MOCK DATABASE (In-Memory)
// ============================================

const mockUsers = [
    {
        cpf: '123.456.789-00',
        senha: '123456',
        nome: 'João Silva Santos',
        email: 'joao@email.com',
        telefone: '(11) 99999-9999'
    },
    {
        cpf: '987.654.321-00',
        senha: 'senha123',
        nome: 'Maria Oliveira Costa',
        email: 'maria@email.com',
        telefone: '(21) 98888-8888'
    },
    {
        cpf: '111.222.333-44',
        senha: 'abc123',
        nome: 'Pedro Santos Lima',
        email: 'pedro@email.com',
        telefone: '(31) 97777-7777'
    },
    {
        cpf: '555.666.777-88',
        senha: 'teste',
        nome: 'Ana Souza Ferreira',
        email: 'ana@email.com',
        telefone: '(41) 96666-6666'
    },
    {
        cpf: '000.000.000-00',
        senha: '000000',
        nome: 'Carlos Teste Silva',
        email: 'carlos@email.com',
        telefone: '(51) 95555-5555'
    }
];

function findUserByCpf(cpf) {
    return mockUsers.find(user => user.cpf === cpf);
}

function validateLogin(cpf, senha) {
    const user = findUserByCpf(cpf);
    if (user && user.senha === senha) {
        return user;
    }
    return null;
}

// ============================================
// SESSION MANAGEMENT
// ============================================

function checkSession() {
    const isLoggedIn = localStorage.getItem('alistamento_logged_in');
    const userName = localStorage.getItem('alistamento_user_name');
    return isLoggedIn === 'true' && userName;
}

function saveSession(user) {
    localStorage.setItem('alistamento_logged_in', 'true');
    localStorage.setItem('alistamento_user_name', user.nome);
    localStorage.setItem('alistamento_user_cpf', user.cpf);
    localStorage.setItem('alistamento_user_email', user.email);
    localStorage.setItem('alistamento_user_telefone', user.telefone);
    localStorage.setItem('alistamento_last_access', new Date().toLocaleString('pt-BR'));
}

function getSession() {
    return {
        isLoggedIn: checkSession(),
        userName: localStorage.getItem('alistamento_user_name') || 'Usuário',
        userCpf: localStorage.getItem('alistamento_user_cpf') || '',
        userEmail: localStorage.getItem('alistamento_user_email') || '',
        userTelefone: localStorage.getItem('alistamento_user_telefone') || '',
        lastAccess: localStorage.getItem('alistamento_last_access') || new Date().toLocaleString('pt-BR')
    };
}

function logout() {
    localStorage.removeItem('alistamento_logged_in');
    localStorage.removeItem('alistamento_user_name');
    localStorage.removeItem('alistamento_last_access');
    showToast('Logout realizado com sucesso!', 'success');
    setTimeout(function() {
        window.location.href = 'index.html';
    }, 1000);
}

function updateDashboardUserInfo() {
    const session = getSession();
    if (session.isLoggedIn) {
        const userNameEl = document.getElementById('userName');
        const welcomeNameEl = document.getElementById('welcomeName');
        const lastAccessEl = document.getElementById('lastAccess');
        
        if (userNameEl) userNameEl.textContent = session.userName;
        if (welcomeNameEl) welcomeNameEl.textContent = session.userName.split(' ')[0];
        if (lastAccessEl) lastAccessEl.textContent = session.lastAccess;
    }
}

// ============================================
// LOGIN PAGE FUNCTIONS
// ============================================

// CPF Mask
function formatCPF(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    
    input.value = value;
}

// Login Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        const cpfInput = document.getElementById('cpf');
        
        cpfInput.addEventListener('input', function() {
            formatCPF(this);
        });
        
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const cpf = document.getElementById('cpf').value;
            const senha = document.getElementById('senha').value;
            
            if (!cpf || !senha) {
                showToast('Por favor, preencha todos os campos', 'error');
                return;
            }
            
            // Validate login with mock database
            showLoading();
            setTimeout(function() {
                const user = validateLogin(cpf, senha);
                hideLoading();
                
                if (user) {
                    // Save session with user data
                    saveSession(user);
                    showToast('Login realizado com sucesso!', 'success');
                    setTimeout(function() {
                        window.location.href = 'dashboard.html';
                    }, 1000);
                } else {
                    showToast('CPF ou senha incorretos', 'error');
                }
            }, 1500);
        });
    }
});

// ============================================
// GEOLOCATION FUNCTIONS
// ============================================

function getLocation() {
    if (!navigator.geolocation) {
        showToast('Geolocalização não é suportada pelo seu navegador', 'error');
        return;
    }

    showToast('Obtendo sua localização...', 'warning');
    
    navigator.geolocation.getCurrentPosition(
        function(position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            reverseGeocode(lat, lon);
        },
        function(error) {
            let message = 'Erro ao obter localização: ';
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    message += 'Permissão negada';
                    break;
                case error.POSITION_UNAVAILABLE:
                    message += 'Localização indisponível';
                    break;
                case error.TIMEOUT:
                    message += 'Tempo esgotado';
                    break;
                default:
                    message += 'Erro desconhecido';
            }
            showToast(message, 'error');
        },
        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }
    );
}

function reverseGeocode(lat, lon) {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1&accept-language=pt-BR`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data && data.address) {
                const addr = data.address;
                
                // Fill CEP
                if (addr.postcode) {
                    document.getElementById('cep').value = addr.postcode;
                }
                
                // Fill Logradouro
                let logradouro = '';
                if (addr.road) {
                    logradouro = addr.road;
                } else if (addr.pedestrian) {
                    logradouro = addr.pedestrian;
                }
                if (logradouro) {
                    document.getElementById('logradouro').value = logradouro;
                }
                
                // Fill Bairro
                if (addr.suburb || addr.neighbourhood) {
                    document.getElementById('bairro').value = addr.suburb || addr.neighbourhood;
                }
                
                // Fill Cidade
                if (addr.city || addr.town || addr.municipality) {
                    document.getElementById('cidade').value = addr.city || addr.town || addr.municipality;
                }
                
                // Fill Estado
                if (addr.state) {
                    const estadoMap = {
                        'São Paulo': 'SP',
                        'Rio de Janeiro': 'RJ',
                        'Minas Gerais': 'MG',
                        'Bahia': 'BA',
                        'Paraná': 'PR',
                        'Rio Grande do Sul': 'RS',
                        'Pernambuco': 'PE',
                        'Ceará': 'CE',
                        'Pará': 'PA',
                        'Santa Catarina': 'SC',
                        'Goiás': 'GO',
                        'Maranhão': 'MA',
                        'Espírito Santo': 'ES',
                        'Paraíba': 'PB',
                        'Amazonas': 'AM',
                        'Mato Grosso': 'MT',
                        'Rio Grande do Norte': 'RN',
                        'Alagoas': 'AL',
                        'Piauí': 'PI',
                        'Distrito Federal': 'DF',
                        'Mato Grosso do Sul': 'MS',
                        'Sergipe': 'SE',
                        'Rondônia': 'RO',
                        'Acre': 'AC',
                        'Amapá': 'AP',
                        'Roraima': 'RR',
                        'Tocantins': 'TO'
                    };
                    const estadoSigla = estadoMap[addr.state];
                    if (estadoSigla) {
                        document.getElementById('estado').value = estadoSigla;
                    }
                }
                
                showToast('Endereço preenchido com sucesso!', 'success');
            } else {
                showToast('Não foi possível obter o endereço', 'error');
            }
        })
        .catch(error => {
            console.error('Erro no geocoding:', error);
            showToast('Erro ao buscar endereço', 'error');
        });
}

// ============================================
// CADASTRO PAGE FUNCTIONS
// ============================================

let currentStep = 1;

function goToStep(step) {
    // Hide all steps
    document.querySelectorAll('.step-content').forEach(function(el) {
        el.classList.add('hidden');
    });
    
    // Show current step
    document.getElementById('step' + step).classList.remove('hidden');
    
    // Update indicators
    for (let i = 1; i <= 3; i++) {
        const indicator = document.getElementById('step' + i + '-indicator');
        if (i < step) {
            indicator.classList.remove('bg-gray-300', 'text-gray-600');
            indicator.classList.add('bg-green-600', 'text-white');
            indicator.innerHTML = '<i class="fas fa-check"></i>';
        } else if (i === step) {
            indicator.classList.remove('bg-gray-300', 'text-gray-600');
            indicator.classList.add('bg-green-600', 'text-white');
            indicator.innerHTML = i;
        } else {
            indicator.classList.remove('bg-green-600', 'text-white');
            indicator.classList.add('bg-gray-300', 'text-gray-600');
            indicator.innerHTML = i;
        }
    }
    
    // Update progress lines
    if (step > 1) {
        document.getElementById('progress-line-1').classList.add('bg-green-500');
    }
    if (step > 2) {
        document.getElementById('progress-line-2').classList.add('bg-green-500');
    }
    
    currentStep = step;
}

// Step 1 Form
document.addEventListener('DOMContentLoaded', function() {
    const step1Form = document.getElementById('step1Form');
    if (step1Form) {
        // Pre-fill user data from session
        const session = getSession();
        if (session.isLoggedIn) {
            // Update readonly fields with user data
            const nomeInput = document.querySelector('input[value="João Silva Santos"]');
            const cpfInput = document.querySelector('input[value="123.456.789-00"]');
            
            if (nomeInput) nomeInput.value = session.userName;
            if (cpfInput) cpfInput.value = session.userCpf;
            
            // Pre-fill email and phone if available
            const emailInput = document.getElementById('email');
            const telefoneInput = document.getElementById('telefone');
            
            if (emailInput && session.userEmail) {
                emailInput.value = session.userEmail;
            }
            if (telefoneInput && session.userTelefone) {
                telefoneInput.value = session.userTelefone;
            }
        }
        
        step1Form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const telefone = document.getElementById('telefone').value;
            
            if (!email || !telefone) {
                showToast('Por favor, preencha todos os campos', 'error');
                return;
            }
            
            // Update summary
            document.getElementById('summary-email').textContent = email;
            document.getElementById('summary-telefone').textContent = telefone;
            
            goToStep(2);
        });
    }
    
    // Step 2 Form
    const step2Form = document.getElementById('step2Form');
    if (step2Form) {
        // CEP Mask
        const cepInput = document.getElementById('cep');
        if (cepInput) {
            cepInput.addEventListener('input', function() {
                let value = this.value.replace(/\D/g, '');
                if (value.length > 8) value = value.slice(0, 8);
                if (value.length > 5) {
                    value = value.replace(/(\d{5})(\d)/, '$1-$2');
                }
                this.value = value;
            });
        }
        
        step2Form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const cidade = document.getElementById('cidade').value;
            const estado = document.getElementById('estado').value;
            
            if (!cidade || !estado) {
                showToast('Por favor, preencha todos os campos obrigatórios', 'error');
                return;
            }
            
            // Update summary
            document.getElementById('summary-cidade').textContent = cidade + ' - ' + estado;
            
            goToStep(3);
        });
    }
});

function submitForm() {
    const termos = document.getElementById('termos');
    if (!termos.checked) {
        showToast('Você precisa aceitar os termos para continuar', 'warning');
        return;
    }
    
    showLoading();
    setTimeout(function() {
        hideLoading();
        showToast('Cadastro realizado com sucesso!', 'success');
        setTimeout(function() {
            window.location.href = 'status.html';
        }, 1500);
    }, 2000);
}

// ============================================
// FAQ PAGE FUNCTIONS
// ============================================

function toggleFaq(button) {
    const answer = button.nextElementSibling;
    const icon = button.querySelector('.fa-chevron-down');
    
    // Close all other FAQs
    document.querySelectorAll('.faq-answer').forEach(function(el) {
        if (el !== answer) {
            el.classList.add('hidden');
            el.classList.remove('show');
        }
    });
    
    document.querySelectorAll('.faq-item button .fa-chevron-down').forEach(function(el) {
        if (el !== icon) {
            el.style.transform = 'rotate(0deg)';
        }
    });
    
    // Toggle current FAQ
    answer.classList.toggle('hidden');
    answer.classList.toggle('show');
    
    if (answer.classList.contains('show')) {
        icon.style.transform = 'rotate(180deg)';
    } else {
        icon.style.transform = 'rotate(0deg)';
    }
}

function filterFaq(category) {
    // Update active button
    document.querySelectorAll('.faq-filter').forEach(function(btn) {
        btn.classList.remove('bg-green-600', 'text-white');
        btn.classList.add('bg-white', 'text-gray-700');
    });
    
    event.target.closest('.faq-filter').classList.remove('bg-white', 'text-gray-700');
    event.target.closest('.faq-filter').classList.add('bg-green-600', 'text-white');
    
    // Filter items
    document.querySelectorAll('.faq-item').forEach(function(item) {
        if (category === 'all' || item.dataset.category === category) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// FAQ Search
document.addEventListener('DOMContentLoaded', function() {
    const searchFaq = document.getElementById('searchFaq');
    if (searchFaq) {
        searchFaq.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            document.querySelectorAll('.faq-item').forEach(function(item) {
                const text = item.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

function showToast(message, type = 'success') {
    // Remove existing toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create toast
    const toast = document.createElement('div');
    toast.className = 'toast ' + type;
    toast.innerHTML = '<i class="fas fa-' + (type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'exclamation-triangle') + ' mr-2"></i>' + message;
    
    document.body.appendChild(toast);
    
    // Show toast
    setTimeout(function() {
        toast.classList.add('show');
    }, 100);
    
    // Hide toast
    setTimeout(function() {
        toast.classList.remove('show');
        setTimeout(function() {
            toast.remove();
        }, 300);
    }, 3000);
}

function showLoading() {
    let overlay = document.querySelector('.loading-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'loading-overlay';
        overlay.innerHTML = '<div class="text-center"><i class="fas fa-spinner fa-spin text-green-600 text-4xl mb-4"></i><p class="text-gray-600">Processando...</p></div>';
        document.body.appendChild(overlay);
    }
    setTimeout(function() {
        overlay.classList.add('show');
    }, 10);
}

function hideLoading() {
    const overlay = document.querySelector('.loading-overlay');
    if (overlay) {
        overlay.classList.remove('show');
        setTimeout(function() {
            overlay.remove();
        }, 300);
    }
}

// Phone mask
document.addEventListener('DOMContentLoaded', function() {
    const telefoneInput = document.getElementById('telefone');
    if (telefoneInput) {
        telefoneInput.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            if (value.length > 11) value = value.slice(0, 11);
            
            if (value.length > 6) {
                value = value.replace(/(\d{2})(\d{5})(\d)/, '($1) $2-$3');
            } else if (value.length > 2) {
                value = value.replace(/(\d{2})(\d)/, '($1) $2');
            }
            
            this.value = value;
        });
    }
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Console message
console.log('%c🏛️ Protótipo de Alistamento Militar', 'font-size: 20px; font-weight: bold; color: #16a34a;');
console.log('%cAtividade de Melhoria UX - Projeto Acadêmico', 'font-size: 12px; color: #666;');