import { SubmitFeedback } from "./submitFeedback";

/*
  PARA VISUALIZAR AS PARTES DOS ARQUIVOS QUE NÃO FORAM TESTADAS, 
  BASTA ABRIR O ARQUIVO "index.html"
  LOCALIZADO NA PASTA "coverage/icov-report/index.html", NO NAVEGADOR
*/

// Spies (para garantir que funções, dentro da função testada, foram chamadas)
const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();


// Com dependências/parâmetros fakes (pois o objetivo não é testar banco, nem envio de email)
const submitFeedback = new SubmitFeedback(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy },
);

/* 
  describe é uma Switch de teste (vários teste para uma única funcionalidade)
  o mesmo não é necessário (poderia usar apenas o "it()" ou "teste()") 
*/
describe('Submit feedback', () => {
  // "async" pode ser adicionado por conta do "execute" ser uma Promise
  it('should be able to submit a feedback', async () => {
    await expect(
      submitFeedback.execute({ 
        type: 'BUG', 
        comment: 'exemple comment', 
        screenshot: 'data:image/png;base64.test.png', 
      })
    ).resolves.not.toThrow(); //resolves existe devido ao ".execute()" ser uma Promise

    // If some function wasn't called, this test will fail
    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it('should not be able to submit a feedback without a type', async () => {
    await expect(
      submitFeedback.execute({ 
        type: '', 
        comment: 'exemple comment', 
        screenshot: 'data:image/png;base64.test.png', 
      })
    ).rejects.toThrow(); // teste onde espero "rejects" (Promise) 
  });

  it('should not be able to submit a feedback without a comment', async () => {
    await expect(
      submitFeedback.execute({ 
        type: 'BUG', 
        comment: '', 
        screenshot: 'data:image/png;base64.test.png', 
      })
    ).rejects.toThrow(); // teste onde espero "rejects" (Promise) 
  });

  it('should not be able to submit a feedback with an invalid screenshot', async () => {
    await expect(
      submitFeedback.execute({ 
        type: 'BUG', 
        comment: 'exemple comment', 
        screenshot: 'teste.jpg', 
      })
    ).rejects.toThrow(); // teste onde espero "rejects" (Promise) 
  });

});