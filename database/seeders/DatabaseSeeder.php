<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\Task;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        User::factory()->create([
            'name' => 'Ahmed Alaa',
            'email' => 'ahmed.alla56756@gmail.com',
            'password' => bcrypt('Ahmed1144'),
            'email_verified_at' => time(),
        ]);

        User::factory(1000)->create();

        Project::factory(500)->hasTasks(3)->create();
    }
}
