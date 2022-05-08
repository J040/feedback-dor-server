import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbackRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbackRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedback {

  constructor(
    private feedbackRepository: FeedbackRepository,
    private mailAdapter: MailAdapter
  ) {}

  async execute(request: SubmitFeedbackRequest) {
    const { type, comment, screenshot } = request;

    if (!type) {
      throw new Error('Type is required!');
    }

    if (!comment) {
      throw new Error('Type is required!');
    }

    if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
      throw new Error('Invalid screenshot format!');
    }

    await this.feedbackRepository.create({ type, comment, screenshot });

    await this.mailAdapter.sendMail({
      subject: 'Novo Feedback',
      body: [
        '<div style="font-family: sans-serif; font-size: 16px; color: #111;">',
        `<p>Tipo do Feedback: <b>${type}</b></p>`,
        `<p>Comentário: ${comment}</p>`,
        `<p>Image:</p>`,
        screenshot ? `<img src="${screenshot}" alt="feedback-image" />` : '',
        '</div>',
      ].join('\n'), //cada posição do array se torna uma linha do HTML
    })
  }
}