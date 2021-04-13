const { nanoid } = require('nanoid');
const {books} = require('./notes');
 
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
  
   
    // const isSuccess = notes.filter((note) => note.id === id).length > 0;
    isSuccess = name !== undefined


    // console.log(isSuccess)
    // console.log(notes.filter((note) => note.id === id))
   
    if (isSuccess&&!(readPage>pageCount)&&publisher) {
      const newNote = {
        name, year, author, summary,publisher,pageCount, readPage,finished,reading,insertedAt,updatedAt, id
      };
      // console.log(newNote);
      books.push(newNote);
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
        message: 'Gagal menambahkan buku. Mohon isi nama buku',
      });
      response.code(400);
      return response;
    }else if(readPage>pageCount){
      const response = h.response({
        status: 'fail',
        message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
      });
      response.code(400);
      return response;
    }
    
  
      };

  const getAllNotesHandler = () => ({
    //memang tidak ada di test tapi di run dari awal sehingga mengembalikan 1 array supaya tidak error
    status: 'success',
    data: {
      books: books.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,

      })),

  },
  });
   
  const getNoteByIdHandler = (request, h) => {
    const { id } = request.params;
  //  console.log
    const book = books.filter((n) => n.id === id)[0];
    // console.log(books.filter((n) => n.id === id))
   if (book !== undefined) {
      return {
        status: 'success',
        data: {
          book,
        },
      };
    }else{ const response = h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;}
   
    
  };
   
  const editNoteByIdHandler = (request, h) => {
    const { id } = request.params;
   
    const { name, year, author,summary,publisher,pageCount,readPage,reading } = request.payload;
    // const updatedAt = new Date().toISOString();
   
    const index = books.findIndex((note) => note.id === id);
    
   
    if (index !== -1&&name !== undefined&&readPage<pageCount) {
      books[index] = {
        ...books[index],
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,reading
      };
      // console.log(books[index])
      const response = h.response({
        status: 'success',
        message: 'Buku berhasil diperbarui',
      });
      response.code(200);
      return response;
    }else if(readPage>pageCount){
      const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
      });
      response.code(400);
      return response;
    }else if(name==undefined){
      const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Mohon isi nama buku',
      });
      response.code(400);
      return response;
    }else{ 
      const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
      });
      response.code(404);
      return response;
    }
   
 
    // console.log(response)
  };
   
  const deleteNoteByIdHandler = (request, h) => {
    const { id } = request.params;
   
    const index = books.findIndex((note) => note.id === id);
   
    if (index !== -1) {
      books.splice(index, 1);
      const response = h.response({
        status: 'success',
        message: 'Buku berhasil dihapus',
      });
      response.code(200);
      return response;
    }else { const response = h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
    }
   
  };
   
  module.exports = {
    addNoteHandler,
    getAllNotesHandler,
    getNoteByIdHandler,
    editNoteByIdHandler,
    deleteNoteByIdHandler,
  };
