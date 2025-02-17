<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateTaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'min:3', 'max:100'],
            'description' => ['required', 'string', 'min:10', 'max:500'],
            'image' => ['nullable', 'image', 'mimes:png,jpg'],
            'status' => ['required', 'string', Rule::in(['pending', 'in_progress', 'completed'])],
            'priority' => ['required', 'string', Rule::in(['low', 'medium', 'high'])],
            'due_date' => ['required', 'date'],
            'assigned_user_id' => ['required', 'exists:users,id'],
            'project_id' => ['required', 'exists:projects,id'],
        ];
    }
}
