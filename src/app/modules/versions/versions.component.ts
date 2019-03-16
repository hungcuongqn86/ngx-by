import {Component, OnInit, TemplateRef} from '@angular/core';
import {Router} from '@angular/router';
import {VersionsService} from '../../services/versions.service';
import {Version} from '../../models/Version';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
    selector: 'app-bases',
    templateUrl: './versions.component.html',
    styleUrls: ['./versions.component.css']
})

export class VersionsComponent implements OnInit {
    version: Version;
    Versions: Version[];
    totalItems = 0;
    modalRef: BsModalRef;

    constructor(public versionsService: VersionsService,
                private router: Router, private modalService: BsModalService) {

    }

    ngOnInit() {
        this.searchVersions();
    }

    pageChanged(event: any): void {
        this.versionsService.search.page = event.page;
        this.searchVersions();
    }

    public addVersion() {
        this.versionsService.version.id = null;
        this.router.navigate(['/version/add']);
    }

    public editVersion(id) {
        this.router.navigate([`/version/${id}`]);
    }

    public deleteVersion() {
        if (this.version) {
            this.version.is_deleted = 1;
            this.versionsService.editVersion(this.version)
                .subscribe(res => {
                    this.searchVersions();
                });
        }
    }

    public searchVersions() {
        this.versionsService.getVersions(this.versionsService.search)
            .subscribe(versions => {
                this.Versions = versions.data.data;
                this.totalItems = versions.data.total;
            });
    }

    openModal(template: TemplateRef<any>, version) {
        this.version = version;
        this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
    }

    confirm(): void {
        this.deleteVersion();
        this.modalRef.hide();
    }

    decline(): void {
        this.modalRef.hide();
    }
}
