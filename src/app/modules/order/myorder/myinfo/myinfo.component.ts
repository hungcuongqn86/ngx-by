import {Component, AfterViewChecked, ElementRef, ViewChild, OnInit} from '@angular/core';
import {OrderService, OrderStatus} from '../../../../services/order/order.service';
import {PackageStatus} from '../../../../models/Package';
import {Comment} from '../../../../models/Comment';

@Component({
    selector: 'app-myorder-detail-info',
    templateUrl: './myinfo.component.html',
    styleUrls: ['./myinfo.component.css']
})

export class MyinfoComponent implements OnInit, AfterViewChecked {
    status: OrderStatus[];
    pkStatus: PackageStatus[];
    comment: Comment;
    comments: Comment[];
    @ViewChild('scrollMe') private myScrollContainer: ElementRef;

    constructor(public orderService: OrderService) {
        this.comment = {
            id: null,
            order_id: null,
            user_id: null,
            user_name: null,
            content: null,
            is_admin: 0,
            created_at: null
        };
        this.getStatus();
        this.getPkStatus();
        this.getChat();
    }

    ngOnInit() {
        this.scrollToBottom();
    }

    ngAfterViewChecked() {
        this.scrollToBottom();
    }

    scrollToBottom(): void {
        try {
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        } catch (err) {
        }
    }

    public getChat() {
        this.orderService.getComments(this.orderService.orderRe.id)
            .subscribe(data => {
                this.comments = data.data;
            });
    }

    public getStatus() {
        this.orderService.showLoading(true);
        this.orderService.getStatus()
            .subscribe(orders => {
                this.status = orders.data;
                this.orderService.showLoading(false);
            });
    }

    public getPkStatus() {
        this.orderService.showLoading(true);
        this.orderService.getPkStatus()
            .subscribe(pks => {
                this.pkStatus = pks.data;
                this.orderService.showLoading(false);
            });
    }

    public addComment(): void {
        if (this.comment.content) {
            this.orderService.addComments({
                order_id: this.orderService.orderRe.id,
                content: this.comment.content,
                is_admin: this.comment.is_admin
            })
                .subscribe(res => {
                    this.comment.content = null;
                    this.getChat();
                });
        }
    }
}
