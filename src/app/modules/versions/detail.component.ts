import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {VersionsService} from '../../services/versions.service';

@Component({
    selector: 'app-base-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.css']
})

export class DetailComponent implements OnInit {
    public applist = [
        {code: 'vs', name: 'Lịch vạn sự'},
        {code: 'spt', name: 'Sim phong thủy'},
    ];

    constructor(private router: Router, private route: ActivatedRoute
        , public versionsService: VersionsService) {
        this.route.params.subscribe(params => {
            if (params['id']) {
                this.versionsService.version.id = params['id'];
            }
        });
    }

    ngOnInit() {
        if (this.versionsService.version.id !== null) {
            this.versionsService.getVersion(this.versionsService.version.id)
                .subscribe(version => {
                    this.versionsService.version = version.data.sim;
                });
        } else {
            this.versionsService.reset();
        }
    }

    public backlist() {
        this.router.navigate(['/version']);
    }
}
