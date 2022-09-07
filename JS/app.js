console.log('conectado');

const formulario  = document.getElementById('formulario');
const listaTareas = document.getElementById('lista-tareas');
const template    = document.getElementById('template').content; //content para solo seleccionar el contenido
const fragment    = document.createDocumentFragment();

//const: 
let tareas = {}

document.addEventListener('DOMContentLoaded',() => { //PARA AGREGAR EVENTO
		console.log('cargo la pagina')
		if(localStorage.getItem('tareas')){
			tareas = JSON.parse(localStorage.getItem('tareas'))
			pintarTareas()
		}
})

listaTareas.addEventListener('click', e =>{
	btnAcciones(e)
})

formulario.addEventListener('submit', e => {
	  e.preventDefault()
  	//console.log('evento', e)
		setTarea(e)
})

const setTarea = e => {
	
	const texto = e.target.querySelector('input').value;
	//console.log(texto)
	
		
		if(texto.trim() === ''){	//TRIM QUITA TODOS LOS ESPACIOS DE UNA CADENA DE TEXTO
			console.log('Cadena vacía')
			return
		} 

		const tarea = {
			id: Date.now(), 
			texto: texto,
			estado: false
		}
		
		//console.log('Tarea', tarea)
		tareas [tarea.id] = tarea
		pintarTareas()
		formulario.reset() //RESET PARA REINICIAR EL FORMULARIO Y QUEDE VACIO
		e.target.querySelector('input').focus()

}

const pintarTareas = () => {
	localStorage.setItem('tareas', JSON.stringify(tareas))
	if(Object.values(tareas).length === 0){
			listaTareas.innerHTML = //ASIGNAR TEXTO HTML 
			`
				<div class="alert alert-dark">
					Sin tareas pendientes
				</div> 
			`
			return
	}

	listaTareas.innerHTML = ''
	Object.values(tareas).forEach( item => {
		//console.log('item', item)
		const clone = template.cloneNode(true)
		clone.querySelector('p').textContent = item.texto

		if(item.estado){
			clone.querySelectorAll('.fas')[0].classList.replace('fa-check-circle', 'fa-undo-alt')
			clone.querySelector('.alert').classList.replace('alert-warning', 'alert-primary')
			clone.querySelector('p').style.textDecoration ='line-through'
		}
		clone.querySelectorAll('.fas')[0].dataset.id = item.id
		clone.querySelectorAll('.fas')[1].dataset.id = item.id
		fragment.appendChild(clone)
	})

	listaTareas.appendChild(fragment)
}

const btnAcciones = e => {
	if(e.target.classList.contains('fa-check-circle')){
			tareas[e.target.dataset.id].estado = true
			pintarTareas()
	}

	if(e.target.classList.contains('fa-undo-circle')){
		tareas[e.target.dataset.id].estado = false
		pintarTareas()
	}

	if(e.target.classList.contains('fa-minus-circle')){
		delete tareas[e.target.dataset.id]
		pintarTareas()
	}

	
}