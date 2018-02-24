import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { UserService } from '../service/utils.service';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import {undo} from "ngrx-undo";
@Component({
   selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})

export class QuestionComponent implements OnInit {
    public categoryid: any;
    public questionnaireid;
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    addExtraClass: boolean = false;
    autoHide: number = 4000;
    questionnaire={};
    public questions:any={};
    public makeCopyObject:any;
    public setRange=0;
    public cnt =0;
    items=[];
    msg = '';
    constructor(private dragula: DragulaService,public activateRouter: ActivatedRoute, public userService: UserService, public router: Router, public snackBar: MatSnackBar) {
   		this.questions.questionData =[
   			{
			    "questionsTitle" : "What colors do you like?",
			    "questionsType" : "checkboxes",
			    "multiplechoice" : [ 
			        {
			            "name" : "multi",
			            "value" : 1
			        }
			    ],
			    "checkboxes" : [ 
			        {
			            "name" : "cb1",
			            "value" : 1
			        }
			    ],
			    "paragraph" : null,
			    "date" : null,
			    "linearscale" : {
			        "startRange" : 1,
			        "endRange" : 1
			    },
			    "isrequired" : false,
			    "isshowvalue" : false
			},
			{
			    "questionsTitle" : "How nervous are you?",
			    "questionsType" : "multiplechoice",
			    "multiplechoice" : [ 
			        {
			            "name" : "multi",
			            "value" : 1
			        }
			    ],
			    "checkboxes" : [ 
			        {
			            "name" : "cb1",
			            "value" : 1
			        }
			    ],
			    "paragraph" : null,
			    "date" : null,
			    "linearscale" : {
			        "startRange" : 1,
			        "endRange" : 1
			    },
			    "isrequired" : false,
			    "isshowvalue" : false
			},
			{
			    "questionsTitle" : "What is your birth date?",
			    "questionsType" : "multiplechoice",
			    "multiplechoice" : [ 
			        {
			            "name" : "multi",
			            "value" : 1
			        }
			    ],
			    "checkboxes" : [ 
			        {
			            "name" : "cb1",
			            "value" : 1
			        }
			    ],
			    "paragraph" : null,
			    "date" : null,
			    "linearscale" : {
			        "startRange" : 1,
			        "endRange" : 1
			    },
			    "isrequired" : false,
			    "isshowvalue" : false
			},
			{
			    "questionsTitle" : "Type your favorite quote",
			    "questionsType" : "multiplechoice",
			    "multiplechoice" : [ 
			        {
			            "name" : "multi",
			            "value" : 1
			        }
			    ],
			    "checkboxes" : [ 
			        {
			            "name" : "cb1",
			            "value" : 1
			        }
			    ],
			    "paragraph" : null,
			    "date" : null,
			    "linearscale" : {
			        "startRange" : 1,
			        "endRange" : 1
			    },
			    "isrequired" : false,
			    "isshowvalue" : false
			}
   		];

   		this.dragula.setOptions('question-questionsObj', {
	      revertOnSpill: true
	    });
	    this.dragula.setOptions('question-checkbox', {
	      revertOnSpill: true
	    });
	    this.dragula.setOptions('question-mutipleChoice', {
	      revertOnSpill: true
	    });
    }

    ngOnInit() {
    	this.dragula.drag.subscribe(value => {
	        this.msg = `Dragging the ${ value[1].innerText }!`;
	      });

    	this.dragula.drop.subscribe(value => {
        	this.msg = `Dropped the ${ value[1].innerText }!`;
	        setTimeout(() => {
	          this.msg = '';
	        }, 1000);
      	});
        window.scrollTo(0, 0)
    }

  
    
    changeQueType(dataObj,type){
    	if(type === 'multiplechoice'){
    		alert("1");
    		for(let i in this.questions.questionData){
	            if (this.questions.questionData[i]._id === dataObj._id) {
	            	this.questions.questionData[i].checkboxes=[];
	            }
	        }
    	}else if(type === 'checkboxes'){
    		for(let i in this.questions.questionData){
	            if (this.questions.questionData[i]._id === dataObj._id) {
	            	this.questions.questionData[i].multiplechoice=[];
	            }
	        }
    	}else{
    		for(let i in this.questions.questionData){
	            if (this.questions.questionData[i]._id === dataObj._id) {
	            	this.questions.questionData[i].multiplechoice=[];
	            	this.questions.questionData[i].checkboxes=[];
	            }
	        }
    	}
    }
    addMutipleChoice(object){
    	for(let i in this.questions.questionData){
            if (this.questions.questionData[i]._id === object._id) {
                 this.questions.questionData[i].multiplechoice.push({
                    name:'multi'+(this.questions.questionData[i].multiplechoice.length +1),
                    value:1
                });
            }
        }
    }
    addCheckboxChoice(object){
    	console.log("new other checkbox added..................",object);
    	for(let i in this.questions.questionData){
            if (this.questions.questionData[i]._id === object._id) {
                this.questions.questionData[i].checkboxes.push({
                   name:'cb'+(this.questions.questionData[i].checkboxes.length+1),
                   value:1
                });
            }
        }
    }

    copyQuestion(copyObject){
    	let dump =[];
    	let notdump=[];
    	console.log("seleced object..........................",copyObject);
    	if(copyObject.questionsType === 'multiplechoice'){
    		for (let h in copyObject.multiplechoice){
                dump.push({
                    name:copyObject.multiplechoice[h].name,
                    value:copyObject.multiplechoice[h].value
                });
	    		console.log("oh...multiplechoice.................",copyObject.multiplechoice.length ,dump.length);
	    		if(copyObject.multiplechoice.length  === dump.length ){
	    			this.questions.questionData.push({
			            _id:copyObject._id+'dup' ,
			            questionsTitle: copyObject.questionsTitle,
			            questionsType: copyObject.questionsType,
			            multiplechoice:dump,
			            checkboxes:notdump,
			            isrequired:copyObject.isrequired,
			            isshowvalue:copyObject.isshowvalue,
			            action:false
		        	});
	    		}
	    	}
    	} else if(copyObject.questionsType === 'checkboxes'){
    		for (let h in copyObject.checkboxes){
	    		dump.push({
                    name:copyObject.checkboxes[h].name,
                    value:copyObject.checkboxes[h].value
                });
	    		console.log("oh.......checkboxes.............",copyObject.checkboxes.length ,dump.length);
	    		if(copyObject.checkboxes.length  === dump.length ){
	    			this.questions.questionData.push({
			            _id:copyObject._id+'dup' ,
			            questionsTitle: copyObject.questionsTitle,
			            questionsType: copyObject.questionsType,
			            checkboxes:dump,
			            multiplechoice:notdump,
			            isrequired:copyObject.isrequired,
			            isshowvalue:copyObject.isshowvalue,
			            min:copyObject.min,
			            max:copyObject.max,
			            action:false
		        	});
	    		}
	    	}
    	} else if(copyObject.questionsType === 'linearscale'){
    		this.questions.questionData.push({
	            _id:copyObject._id+'dup' ,
	            questionsTitle: copyObject.questionsTitle,
	            questionsType: copyObject.questionsType,
	            checkboxes:notdump,
	            multiplechoice:notdump,
	            linearscale:copyObject.linearscale,
	            paragraph:null,
	            date:null,
	            isrequired:copyObject.isrequired,
	            isshowvalue:copyObject.isshowvalue,
	            action:false
        	});
    	}
    	else{
    		this.questions.questionData.push({
	            _id:copyObject._id+'dup' ,
	            questionsTitle: copyObject.questionsTitle,
	            questionsType: copyObject.questionsType,
	            checkboxes:notdump,
	            multiplechoice:notdump,
	            linearscale:null,
	            paragraph:copyObject.paragraph,
	            date:copyObject.date,
	            isrequired:copyObject.isrequired,
	            isshowvalue:copyObject.isshowvalue
        	});
    	}
    	
    }

    deletequestion(delObj){
    	for(let i in this.questions.questionData){
            if (this.questions.questionData[i]._id === delObj._id) {
            	this.questions.questionData.splice(i,1);
            }
        }
    }

   

    cretaeStartRange(val){
    	this.setRange =val;
    	var items = [];
	  	for(var i = 1; i <= 10; i++){
	     items.push(i);
	  	}
	  	return items;
    }
    changeScale(start){
    	this.setRange =start;
    }

    cretaeStopRange(){
    	var items= [];
	  	for(var i = this.setRange; i <= 10; i++){
	     items.push(i);
	  	}
	  	return items;
    }

    addNewQuestion(){
        var addObj={
            questionsTitle : "Untitled Question ?",
            questionsType: "multiplechoice",
            multiplechoice : [ "multi"],
            checkboxes : [ "cb1"],
            paragraph : null,
            date : null,
            linearscale : {"startRange" : 1,"endRange" : 1},
            isrequired : false,
            isshowvalue : false
        }
        this.questions.questionData.push(addObj);
    }

    mouseClick(obj){
    	for(let i in this.questions.questionData){
    		this.questions.questionData[i].action =false;
    		console.log("mouse data.........................",obj);
            if (this.questions.questionData[i].questionsTitle === obj.questionsTitle) {
            	// this.questions.questionData.splice(i,1);
            	this.questions.questionData[i].action =true;
            }
        }
    }


    undoMethode(){

    }
}
