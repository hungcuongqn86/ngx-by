import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OwnerService} from '../../../services/mowner/owner.service';

@Component({
    selector: 'app-mowner-owner-detail',
    templateUrl: './owner.detail.component.html',
    styleUrls: ['./owner.detail.component.css']
})

export class OwnerDetailComponent implements OnInit {
    constructor(private router: Router, private route: ActivatedRoute
        , public ownerService: OwnerService) {
        this.route.params.subscribe(params => {
            if (params['id']) {
                this.ownerService.owner.id = params['id'];
            }
        });
    }

    ngOnInit() {
        if (this.ownerService.owner.id !== null) {
            this.ownerService.getOwner(this.ownerService.owner.id)
                .subscribe(owner => {
                    this.ownerService.owner = owner.data.owner;
                });
        } else {
            this.ownerService.reset();
        }
    }

    public backlist() {
        this.router.navigate(['/mowner/owner']);
    }
}
