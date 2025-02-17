<?php

namespace Database\Factories;

use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Project>
 */
class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->sentence(2),
            'description' => fake()->realText(),
            'due_date' => fake()->dateTimeBetween('now', '+1 year')->format('Y-m-d H:i:s'),
            'status' => fake()->randomElement(['pending', 'in_progress', 'completed']),
            'image_path' => fake()->imageUrl(),
            'created_by' => User::get()->random()->id,
            'updated_by' => User::get()->random()->id,
        ];
    }
}
