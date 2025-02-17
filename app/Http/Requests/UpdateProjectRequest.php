<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProjectRequest extends FormRequest
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
            'name' => ['string', 'required', 'min:5', 'max:50'],
            'description' => ['string', 'required', 'min:5', 'max:500'],
            'due_date' => ['required', 'date'],
            'image' => ['nullable', 'image', 'mimes:png,jpg'],
            'status' => ['required', 'string', Rule::in(['pending', 'in_progress', 'completed'])],
        ];
    }
}
