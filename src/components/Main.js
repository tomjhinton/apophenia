import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from 'react-three-fiber'
import TweenMax from 'gsap'
const THREE = require('three')
import axios from 'axios'


import * as vertexShader1 from './vertexShader1.vert'
import * as fragmentShader1 from './fragmentShader1.frag'

import * as vertexShader2 from './vertexShader2.vert'
import * as fragmentShader2 from './fragmentShader2.frag'

import * as vertexShader3 from './vertexShader3.vert'
import * as fragmentShader3 from './fragmentShader3.frag'


let img =  new THREE.TextureLoader().load( './assets/texture.png')
// img.minFilter = THREE.LinearFilter;




const mouse = new THREE.Vector2(0, 0)
const uniforms1 = {
  uTexture: { value: img },
  u_mouseX: { value: Math.abs(mouse.x) },
  u_mouseY: { value: Math.abs(mouse.Y) },
  u_mouse: { value: mouse },
  u_time: { value: 0 },
  u_res: { value: new THREE.Vector2(window.innerWidth/2, window.innerHeight/2) }
}

const uniforms2 = {
  uTexture: { value: img },
  u_mouseX: { value: Math.abs(mouse.x) },
  u_mouseY: { value: Math.abs(mouse.Y) },
  u_mouse: { value: mouse },
  u_time: { value: 0 },
  u_res: { value: new THREE.Vector2(window.innerWidth/2, window.innerHeight/2) }
}

const uniforms3 = {
  uTexture: { value: img },
  u_mouseX: { value: Math.abs(mouse.x) },
  u_mouseY: { value: Math.abs(mouse.Y) },
  u_mouse: { value: mouse },
  u_time: { value: 0 },
  u_res: { value: new THREE.Vector2(window.innerWidth/2, window.innerHeight/2) }
}

function Panel1(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef()

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    uniforms1.u_time.value += 0.004

      // mesh.current.rotation.x = mesh.current.rotation.x += 0.01
  }


  )


  return (
    <mesh
      {...props}
      ref={mesh}
      scale={ [12, 6, 2]}
      onClick={e => setActive(!active)}
      onPointerOver={e => {
        setHover(true)
        // console.log(e)
      }}
      onPointerOut={e => setHover(false)}>
      <planeGeometry attach="geometry" args={[1, 1, 32, 64]} />
      <shaderMaterial
        attach="material"
        args={[{
          uniforms: uniforms1,
          vertexShader: vertexShader1,
          fragmentShader: fragmentShader1
        }]}
        transparent
      />
    </mesh>
  )
}

function Panel2(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef()

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    uniforms1.u_time.value += 0.004
    uniforms2.u_time.value += 0.004
    uniforms3.u_time.value += 0.004

      // mesh.current.rotation.x = mesh.current.rotation.x += 0.01
  }


  )


  return (
    <mesh
      {...props}
      ref={mesh}
      scale={ [12, 6, 2]}
      onClick={e => setActive(!active)}
      onPointerOver={e => {
        setHover(true)
        // console.log(e)
      }}
      onPointerOut={e => setHover(false)}>
      <planeGeometry attach="geometry" args={[1, 1, 32, 64]} />
      <shaderMaterial
        attach="material"
        args={[{
          uniforms: uniforms2,
          vertexShader: vertexShader2,
          fragmentShader: fragmentShader2
        }]}
        transparent
      />
    </mesh>
  )
}

function Panel3(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef()

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    uniforms1.u_time.value += 0.004

      // mesh.current.rotation.x = mesh.current.rotation.x += 0.01
  }


  )


  return (
    <mesh
      {...props}
      ref={mesh}
      scale={ [12, 6, 2]}
      onClick={e => setActive(!active)}
      onPointerOver={e => {
        setHover(true)
        // console.log(e)
      }}
      onPointerOut={e => setHover(false)}>
      <planeGeometry attach="geometry" args={[1, 1, 32, 64]} />
      <shaderMaterial
        attach="material"
        args={[{
          uniforms: uniforms3,
          vertexShader: vertexShader3,
          fragmentShader: fragmentShader3
        }]}
        transparent
      />
    </mesh>
  )
}



class Main extends React.Component{
  constructor(){
    super()
    this.state = {
      data: {},
      error: ''

    }
    this.componentDidMount = this.componentDidMount.bind(this)
    this.mouseMove = this.mouseMove.bind(this)






  }


  componentDidMount(){
    axios.get('/api/works')
    .then(res => {
      this.setState({works: res.data})
      const pan1 = new THREE.TextureLoader().load( `data:image/png;base64,  ${this.state.works[0].dat.slice(2).slice(0, -1)}` )
      uniforms1.uTexture.value = pan1

      const pan2 = new THREE.TextureLoader().load( `data:image/png;base64,  ${this.state.works[1].dat.slice(2).slice(0, -1)}` )
      uniforms2.uTexture.value = pan2

      const pan3 = new THREE.TextureLoader().load( `data:image/png;base64,  ${this.state.works[2].dat.slice(2).slice(0, -1)}` )
      uniforms3.uTexture.value = pan3
    })


  }

  componentDidUpdate(){



  }

  mouseMove(e){

    //console.log(e)

    this.setState({bass: `${e.screenX /100000} ${e.screenY /100000} `, scale: `${e.screenY /2}` })
  }




  render() {



    return (
      <div onMouseMove={this.mouseMove} className="body">
        <div className='title'>apophenia</div>
        <div className='panel1'>
          <Canvas style={{ background: '#FFFFF' }}>
            {console.log(this)}
            <ambientLight />
            <pointLight position={[10, 10, 10]} />

            <Panel1 position={[0, 0, 0]} />



          </Canvas>
        </div>
        {this.state.works && <div className="text1">{this.state.works[1].text}</div>}
        <div className='panel2'>
          <Canvas style={{ background: '#FFFFF' }}>
            {console.log(this)}
            <ambientLight />
            <pointLight position={[10, 10, 10]} />

            <Panel2 position={[0, 0, 0]} />



          </Canvas>
        </div>
        {this.state.works && <div className="text2">{this.state.works[0].text}</div>}

        <div className='panel3'>
          <Canvas style={{ background: '#FFFFF' }}>
            {console.log(this)}
            <ambientLight />
            <pointLight position={[10, 10, 10]} />

            <Panel3 position={[0, 0, 0]} />



          </Canvas>
        </div>
        {this.state.works && <div className="text3">{this.state.works[2].text}</div>}

      </div>




    )
  }
}
export default Main
