import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { baseURL, jwtToken } from 'src/assets/env';
import { cardService } from './service/card.service';
import { getToken } from './service/request';
import { getFromLocalStorage } from './service/storage';

export interface post {
  id: string
  titulo: string,
  conteudo: string,
  lista: string
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  token = getFromLocalStorage(jwtToken);
  title: any;
  description: any;
  stage: any;
  cardForm!: FormGroup;
  getCard: any;
  getListDoing: any;
  getListTodo: any;
  getListDone: any;
  default: string = "TODO";
  isAlterCard: boolean = false;
  statusSelected: string = '';
  statusChange: string = '';
  status: any = [{
    nome: "TODO", value: "TODO"
  },
  {
    nome: "DOING", value: "DOING"
  },
  {
    nome: "DONE", value: "DONE"
  }
]

  constructor(
    private cardService: cardService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.cardForm = this.formBuilder.group({
      title: [this.title],
      description: [this.description],
      stage: [this.stage]
    })
    if (this.token === null) {
      getToken();
    };
    this.listarTodosCard();
  }

  listarTodosCard(): void {

    this.cardService.getCard().subscribe(
      (cards: any) => {
        this.getListDoing = [];
        this.getListTodo = [];
        this.getListDone = [];
        this.getListDoing = cards.filter((card: any) => card.lista === "DOING")
        this.getListTodo = cards.filter((card: any) => card.lista === "TODO")
        this.getListDone = cards.filter((card: any) => card.lista === "DONE")
      });

  }

  alterarCard(data: any) {
    data.alteracaoCard = true;
    if (data.novoTitulo) {
      let param = {
        id: data.id,
        titulo: data.novoTitulo,
        conteudo: data.novoConteudo,
        lista: this.statusChange
      };

      this.cardService.putCard(param).subscribe(() => this.listarTodosCard());
    }

  }

  excluirCard(id: string) {
    let param = {
      id: id
    }
    this.cardService.deleteCard(param).subscribe({
      next: next => {
        next;
        this.listarTodosCard();
      },
      error: error => {
        error
      }
    });
  }

  adicionarCard() {

    let param = {
      data: {
        titulo: this.cardForm.value.title,
        conteudo: this.cardForm.value.description,
        lista: this.statusSelected,
      },
      url: baseURL,
      method: "POST",
    };

    this.cardService.postCard(param).subscribe({
      next: next => {
        next;
        // this.cardForm.title = '';
        // this.cardForm.description = '';
        this.listarTodosCard();
      },
      error: error => {
        error
      }
    });
  }
}
