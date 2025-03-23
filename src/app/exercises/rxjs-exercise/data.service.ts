import { HttpClient } from '@angular/common/http';
import { DestroyRef, Injectable, inject, signal } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';

export interface User {
  id: number;
  name: string;
  score: number;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private destroyRef = inject(DestroyRef);
  private cache$: Observable<User[]>;

  users = signal<User[]>([]);

  constructor(private http: HttpClient) {
    this.cache$ = this.http.get<User[]>('https://api.example.com/users').pipe(
      map((users) => users.sort((a, b) => b.score - a.score)),
      shareReplay({ bufferSize: 1, refCount: true })
    );

    // Mise à jour automatique toutes les 5 secondes
    interval(5000)
      .pipe(
        tap(() => this.loadUsers())
        // takeUntil(this.destroyRef.onDestroy)
      )
      .subscribe();

    // Chargement initial
    this.loadUsers().subscribe((users) => this.users.set(users));
  }

  loadUsers(): Observable<User[]> {
    return this.cache$;
  }

  updateScore(userId: number, newScore: number): void {
    this.users.update((users) =>
      users.map((user) =>
        user.id === userId ? { ...user, score: newScore } : user
      )
    );
  }
}
