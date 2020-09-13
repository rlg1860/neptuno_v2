import express from 'express';
const router = express.Router();
import Post from '../Modelos/Post';
import Usuario from '../Modelos/Usuario';
import subir from '../Almacenamiento'

router.post('/:_id/nuevopost', subir.single("image"), async function (req, res) {
  //Crear nuevo post
  const post = new Post(req.body);
  post.fechaPost = new Date();
  post.puntaje = 0;
  if (req.file) {
    
    const { filename } = req.file
    post.setImagen(filename);
  }
  //Buscar el usuario que creo el post
  const usuario = await Usuario.findById(req.params);
  post.usuarioCreador = usuario;
  await post.save();
  res.json(post)
});


router.get('/', async function (req, res) {
  console.log("MOSTRAR POSTS")
  res.json(await Post.find());
});

router.get('/:categoria', async function (req, res) {
  console.log("MOSTRAR POSTS")
  res.json(await Post.find(req.params));

});

router.delete('/:_id/eliminarpost', async function (req, res) {
  console.log("ELIMINAR UN POST")
  await Post.findByIdAndDelete(req.params);
  res.json({ mensaje: 'Usuario eliminado' });
});

export default router;