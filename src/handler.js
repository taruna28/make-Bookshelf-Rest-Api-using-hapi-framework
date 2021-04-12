const { nanoid } = require('nanoid');
const notes = require('./notes');
 
const addNoteHandler = (request, h) => {
    const { 
      name,
      year,
      author,
      summary,
      publisher,
      readPage ,
      pageCount,
      reading ,
       } = request.payload;
   
    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    if(readPage===pageCount){
      finished = true;
    }else{
      finished = false;
    }
  
    
   
    const newNote = {
      name, year, author, summary,publisher,pageCount, readPage,finished,reading,insertedAt,updatedAt, id
    };
    console.log(newNote);
   
    notes.push(newNote);
   
    // const isSuccess = notes.filter((note) => note.id === id).length > 0;
    isSuccess = name !== undefined


    console.log(isSuccess)
    // console.log(notes.filter((note) => note.id === id))
   
    if (isSuccess) {
      const response = h.response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
          bookId: id,
        },
      });
      response.code(201);
      return response;
    }else if(name==undefined){
      const response = h.response({
        status: 'fail',
        message: 'Buku gagal ditambahkan',
      });
      response.code(400);
      return response;
    }else{
      const response = h.response({
        status: 'fail',
        message: 'Buku gagal ditambahkan',
      });
      response.code(500);
      return response;
    }
    
  
      };

  // const getAllNotesHandler = () => ({
  //   status: 'success',
  //   data: {
  //     notes,
  //   },
  // });
   
  const getNoteByIdHandler = (request, h) => {
    const { id } = request.params;
   
    const note = notes.filter((n) => n.id === id)[0];
    console.log(note);
   
   if (note !== undefined) {
      return {
        status: 'success',
        data: {
          note,
        },
      };
    }
   
    const response = h.response({
      status: 'fail',
      message: 'Catatan tidak ditemukan',
    });
    response.code(404);
    return response;
  };
   
  // const editNoteByIdHandler = (request, h) => {
  //   const { id } = request.params;
   
  //   const { title, tags, body } = request.payload;
  //   const updatedAt = new Date().toISOString();
   
  //   const index = notes.findIndex((note) => note.id === id);
   
  //   if (index !== -1) {
  //     notes[index] = {
  //       ...notes[index],
  //       title,
  //       tags,
  //       body,
  //       updatedAt,
  //     };
   
  //     const response = h.response({
  //       status: 'success',
  //       message: 'Catatan berhasil diperbarui',
  //     });
  //     response.code(200);
  //     return response;
  //   }
   
  //   const response = h.response({
  //     status: 'fail',
  //     message: 'Gagal memperbarui catatan. Id tidak ditemukan',
  //   });
  //   response.code(404);
  //   return response;
  //   // console.log(response)
  // };
   
  // const deleteNoteByIdHandler = (request, h) => {
  //   const { id } = request.params;
   
  //   const index = notes.findIndex((note) => note.id === id);
   
  //   if (index !== -1) {
  //     notes.splice(index, 1);
  //     const response = h.response({
  //       status: 'success',
  //       message: 'Catatan berhasil dihapus',
  //     });
  //     response.code(200);
  //     return response;
  //   }
   
  //  const response = h.response({
  //     status: 'fail',
  //     message: 'Catatan gagal dihapus. Id tidak ditemukan',
  //   });
  //   response.code(404);
  //   return response;
  // };
   
  module.exports = {
    addNoteHandler,
    // getAllNotesHandler,
    // getNoteByIdHandler,
    // editNoteByIdHandler,
    // deleteNoteByIdHandler,
  };